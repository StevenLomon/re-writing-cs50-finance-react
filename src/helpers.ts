import axios from 'axios';
import { Response, Request, NextFunction } from 'express'; // For typing Express request and response

interface SessionRequest extends Request {
    session: Express.Session & { user_id?: number };
}

interface AlphaVantageResponse {
    'Time Series (Daily)': {
        [date: string]: {
            '4. close': string;
        };
    };
    Information?: string; // Added Information as an optional property
}

function getErrorMessage(error: unknown): string {
    return (error instanceof Error) ? error.message : String(error);
}

// Escape special regex characters
function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

// Escape function to sanitize input strings
function escape(s: string): string {
    if (typeof s !== 'string') {
        return s;
    }

    const replacements: [string, string][] = [
        ["-", "--"], [" ", "-"], ["_", "__"], ["?", "~q"], ["%", "~p"], ["#", "~h"], ["/", "~s"], ['"', "''"]
    ];

    replacements.forEach(([oldChar, newChar]) => {
        s = s.replace(new RegExp(escapeRegExp(oldChar), 'g'), newChar);
    });
    return s;
}

// Apology function
function apology(res: Response, message: string, code: number = 400): void {
    const escapedMessage = escape(message);
    res.status(code).render('apology', { top: code, bottom: escapedMessage, title: "Error" });
}

// Middleware to ensure login
function loginRequired(req: Request, res: Response, next: NextFunction): void {
    if (!req.session?.user_id) {  // Assuming user_id is stored in session
        return res.redirect('/login');
    }
    next();
}

// Lookup function for stock prices from Alpha Vantage API
interface LookupResult {
    price?: string;
    error?: string;
}

async function lookup(symbol: string): Promise<LookupResult> {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'request' },
            responseType: 'json'
        });

        const data = response.data as AlphaVantageResponse;

        if (data.Information && data.Information.toLowerCase().includes("rate limit")) {
            return { error: "Rate limit exceeded. Please try again later." };
        }

        const latestPrice = parseFloat(Object.values(data['Time Series (Daily)'])[0]['4. close']);
        return { price: latestPrice.toFixed(2) };

    } catch (error) {
        console.error("Error retrieving data from Alpha Vantage:", getErrorMessage(error));
        return { error: "An error occurred while fetching data." };
    }
}

// Format a number as USD currency
function usd(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export { apology, loginRequired, lookup, usd };

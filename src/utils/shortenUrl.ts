import axios from 'axios';
import {Sentry} from "../index";

export const shortenUrl = (longUrl: string): Promise<string> => {
    if (!process.env.SHLINK || !process.env.SHLINKURL) {
        return new Promise<string>(function (resolve) {
            resolve(longUrl);
        })
    }
    const url = process.env.SHLINKURL
    const data = {
        "longUrl": longUrl
    }
    const config = {
        headers: {
            "X-Api-Key": process.env.SHLINK,
            "Content-Type": "application/json"
        }
    }
    return axios.post(url, data, config).then((res) => {
        return res.data.shortUrl;
    }).catch(e => {
        Sentry.captureException(e);
        return new Promise<string>(function (resolve) {
            resolve(longUrl);
        })
    });
}
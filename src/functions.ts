import { JSDOM } from "jsdom";

export const RAND_URL : string = "https://en.wikipedia.org/wiki/Special%3ARandom";
export const NEW_URL : string = "https://en.wikipedia.org/wiki/Special%3ANewPages";
export const TODAY_URL : string = "https://en.wikipedia.org/wiki/Wikipedia:Today%27s_featured_article";

export async function getRandomDocument() : Promise<Document> 
{
    return getDocByURL(RAND_URL);;
}

export async function getRandomTitle() : Promise<string>
{
    let title : Promise<string> = new Promise<string>((resolve, reject) => 
    {
        getRandomDocument()
        .then(doc => resolve(doc.title));
    });

    return title;
}

export async function getNewestURL() : Promise<string> 
{
    let document : Promise<string> = new Promise<string>((resolve, reject) =>
    {
        fetch(NEW_URL)
        .then(res => res.text())
        .then(html => new JSDOM(html).window.document)
        .then(doc => doc.querySelector(".mw-newpages-pagename"))
        .then(link => link?.getAttribute("href"))
        .then(href => 
        {
            if(href)
            {
                resolve(href);
            } else
            {
                resolve("");
                throw new Error("URL Not Found");
            }
        })
        .catch( e =>
        {
            resolve("");
            throw new Error("URL Not Found\n\n" + e);
        });
    });

    return document;
}

export async function getNewestDocument() : Promise<Document>
{
    let url = await getNewestURL();
    return getDocByURL(url);
}

export async function getTodayURL() : Promise<string>
{
    let document : Promise<string> = new Promise<string>((resolve, reject) =>
    {
        fetch(TODAY_URL)
        .then(res => res.text())
        .then(html => new JSDOM(html).window.document)
        .then(doc => doc.querySelector(".MainPageBG"))
        .then(element => element?.getElementsByTagName("b"))
        .then(bcollection => bcollection?.item(0))
        .then(firstb => firstb?.getElementsByTagName("a"))
        .then(acollection => acollection?.item(0))
        .then(link => link?.getAttribute("href"))
        .then(href => 
        {
            if(href)
            {
                resolve(href);
            } else
            {
                resolve("");
                throw new Error("URL Not Found");
            }
        })
        .catch( e =>
        {
            resolve("");
            throw new Error("URL Not Found\n\n" + e);
        });
    });

    return document;
}

export async function getDocByURL(url : string) : Promise<Document>
{
    let document : Promise<Document> = new Promise<Document>((resolve, reject) =>
    {
        fetch(url)
        .then(res => res.text())
        .then(html => new JSDOM(html).window.document)
        .then(doc => resolve(doc));
    });
    
    return document;
}

export async function getTodayDoc() : Promise<Document>
{
    let url : string = await getTodayURL();
    
    return getDocByURL(url);
}
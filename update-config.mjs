import fs from "fs";
import yaml from "yaml";

const FILENAME = ".upptimerc.yml"
const globalSites = {
    "Dein-Ticket.Shop": "https://dein-ticket.shop",
    "Login": "https://login.dein-ticket.shop",
};

const organizations = {
    "klecks": "Kleinkunstverein Klecks e.V.",
    "kqa": "Kunstquartier Allgäu",
    "alpe-muellers-berg": "Alpe Müllers Berg",
};

const subdomains = {
    "": "Verkaufsseite",
    "admin": "Admin-Bereich",
    "vvk": "Vorverkauf",
};

const content = fs.readFileSync(FILENAME, "utf8");
const data = yaml.parse(content);

data.sites = [];

for (const [key, value] of Object.entries(globalSites)) {
    data.sites.push({
        name: key,
        url: value,
    });
}

for (const [key, value] of Object.entries(organizations)) {
    for (const [subdomain, subdomainName] of Object.entries(subdomains)) {
        const name = `${value} - ${subdomainName}`;
        const url = `https://${key}.${subdomain ? `${subdomain}.` : ""}dein-ticket.shop`;
        data.sites.push({
            name,
            url,
        });
    }
}

fs.writeFileSync(FILENAME, yaml.stringify(data));

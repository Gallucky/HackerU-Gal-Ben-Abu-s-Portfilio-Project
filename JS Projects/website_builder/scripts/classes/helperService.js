const dynamicLinkedCSSFiles = [];

export const linkCSSToHTML = (link) => {
    try {
        if (alreadyLinked(link)) {
            throw new Error(`${link} CSS file is already linked.`);
        }

        const linkCSS = document.createElement("link");
        linkCSS.rel = "stylesheet";
        linkCSS.href = link;
        linkCSS.id = `link-css-${link}`;
        dynamicLinkedCSSFiles.push(linkCSS.id);

        document.head.appendChild(linkCSS);
    } catch (err) {
        const msg = `%cLinking ${link} CSS failed.\n` + `Error Message:\n` + err;
        console.log(msg, "color: red;");
        return false;
    } finally {
        const msg = `%c${link} CSS linked successfully.`;
        console.log(msg, "color: green;");
        return true;
    }
};

const alreadyLinked = (link) => {};

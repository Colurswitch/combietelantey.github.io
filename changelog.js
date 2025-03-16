const changelogGen = {
    generate(elem, data = []) {
        /*
            data is a list of: {version: string, date: string, added: string[], removed: string[], updated: string[], fixed: string[]}
        */
        // Generate the HTML for each entry in the data array
        const entries = data.map(({ version, date, added, removed, updated, fixed }) => {
            return `
                <li>
                    <h2>Version ${version} - ${date}</h2>
                    <h3>Added</h3>
                    <ul>${added.map(change => `<li>${change}</li>`).join('')}</ul>
                    <h3>Removed</h3>
                    <ul>${removed.map(change => `<li>${change}</li>`).join('')}</ul>
                    <h3>Updated</h3>
                    <ul>${updated.map(change => `<li>${change}</li>`).join('')}</ul>
                    <h3>Fixed</h3>
                    <ul>${fixed.map(change => `<li>${change}</li>`).join('')}</ul>
                </li>
            `;
        })
        // Join all entries into a single string and wrap it in the given element
        elem.innerHTML = entries.join('');
    }
}
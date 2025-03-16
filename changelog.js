const changelogGen = {
  generate(elem, data = []) {
    /*
            data is a list of: {version: string, date: string, added: string[], removed: string[], updated: string[], fixed: string[]}
        */

    // Sort data array by version name, descending
    data.sort((a, b) => b.version.localeCompare(a.version));
    // Generate the HTML for each entry in the data array
    // Join all entries into a single string and wrap it in the given element
    elem.innerHTML = data.map(
        ({ version, date, added, removed, updated, fixed }) => {
          return `
                  <article class="message">
                      <div class="message-header">
                          <p>${version} - ${date}</p>
                      </div>
                      <div class="message-body">
                          <article class="message is-success">
                              <div class="message-body">
                                  <ul>
                                      ${added.map(add => "<li>"+add+"</li>")}
                                  </ul>
                              </div>
                          </article>
                          <article class="message is-danger">
                              <div class="message-body">
                                  <ul>
                                      ${removed.map(rem => "<li>"+rem+"</li>")}
                                  </ul>
                              </div>
                          </article>
                          <article class="message is-info">
                              <div class="message-body">
                                  <ul>
                                      ${updated.map(upd => "<li>"+upd+"</li>")}
                                  </ul>
                              </div>
                          </article>
                          <article class="message is-warning">
                              <div class="message-body">
                                  <ul>
                                      ${fixed.map(fix => "<li>"+fix+"</li>")}
                                  </ul>
                              </div>
                          </article>
                      </div>
                  </article>
              `;
        }
      ).join("");
  },
};

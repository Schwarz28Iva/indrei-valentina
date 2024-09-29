    let tocId = "toc";
    let headings;
    let headingIds = [];

    function setLinkActive(link) {
      const links = document.querySelectorAll(`#${tocId} a`);
      links.forEach(link => link.classList.remove("active"));
      if (link) {
        link.classList.add("active");
      }
    }

    function buildTableOfContentsFromHeadings() {
      const tocElement = document.querySelector(`#${tocId}`);
      const main = document.querySelector("main");
      if (!main) {
        throw Error("A `main` tag section is required to query headings from.");
      }
      headings = main.querySelectorAll("h1, h2, h3, h4, h5, h6");

      headings.forEach((heading, index) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.innerHTML = heading.innerHTML;
        anchor.href = `#${heading.id}`;
        anchor.id = `${heading.id}-link`;
        anchor.addEventListener("click", event => {
          event.preventDefault();
          const targetId = event.target.getAttribute("href").substring(1);
          const targetHeading = document.getElementById(targetId);
          if (targetHeading) {
            targetHeading.scrollIntoView({ behavior: "smooth" });
          }
        });
        listItem.appendChild(anchor);
        tocElement.appendChild(listItem);
        headingIds.push(heading.id);
      });
    }

    function updateActiveHeadingOnScroll() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      let activeHeadingId = headingIds[0];

      for (let i = 0; i < headingIds.length; i++) {
        const headingElement = document.querySelector(`#${headingIds[i]}`);
        if (headingElement.offsetTop <= scrollPosition) {
          activeHeadingId = headingIds[i];
        } else {
          break;
        }
      }

      setLinkActive(document.querySelector(`#${activeHeadingId}-link`));
    }

    window.addEventListener("load", event => {
      buildTableOfContentsFromHeadings();
      window.addEventListener("scroll", updateActiveHeadingOnScroll);
    });

    window.addEventListener("unload", event => {
      window.removeEventListener("scroll", updateActiveHeadingOnScroll);
    });
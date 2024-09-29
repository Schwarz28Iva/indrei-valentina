window.addEventListener("DOMContentLoaded", () => {
  const tocElement = document.getElementById("toc");
  const main = document.querySelector("main");
  const navbar = document.querySelector("nav");

  if (!tocElement || !main || !navbar) {
    console.error("Table of Contents, main element, or navbar not found.");
    return;
  }

  const headings = main.querySelectorAll("h1, h2, h3, h4");
  if (!headings.length) {
    console.error("No headings found in the main element.");
    return;
  }

  const tocList = document.createElement("ul");
  let currentLevel = 1;
  let parentList = tocList;

  headings.forEach((heading, index) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    const headingText = heading.textContent;
    const headingId = `heading-${index + 1}`;
    const headingLevel = parseInt(heading.tagName.charAt(1));

    heading.id = headingId;
    link.href = `#${headingId}`;
    link.textContent = headingText;

    if (headingLevel > currentLevel) {
      const sublist = document.createElement("ul");
      parentList.lastChild.appendChild(sublist);
      parentList = sublist;
    } else if (headingLevel < currentLevel) {
      parentList = parentList.parentElement.parentElement;
    }

    listItem.appendChild(link);
    parentList.appendChild(listItem);

    currentLevel = headingLevel;
  });

  tocElement.appendChild(tocList);

  // Get the content from the first section's <nav id="toc">
  var tocContent = document.getElementById('toc').innerHTML;

  // Insert the content into the second section's <nav id="toc">
  document.getElementById('myOverlayNav').innerHTML = tocContent;

  // Calculate the offset values
  const pageHeight = document.documentElement.scrollHeight;
  const offset = 20;

  // Adjust scroll position for sections
  const sections = document.querySelectorAll("main > section");

  sections.forEach((section) => {
    let sectionTop = section.offsetTop - offset;
    let sectionBottom = sectionTop + section.offsetHeight + offset;

    section.addEventListener("mouseenter", () => {
      sectionTop = section.offsetTop - offset;
      sectionBottom = sectionTop + section.offsetHeight + offset;
    });

    section.addEventListener("mouseleave", () => {
      sectionTop = section.offsetTop - offset;
      sectionBottom = sectionTop + section.offsetHeight + offset;
    });

    section.addEventListener("click", () => {
      sectionTop = section.offsetTop - offset;
      sectionBottom = sectionTop + section.offsetHeight + offset;
    });

    section.isInView = function (scrollPosition) {
      return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
    };
  });

  // Highlight active link based on scroll position
  function highlightActiveLink() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const firstHeading = headings[0];
    const lastHeading = headings[headings.length - 1];

    let activeHeading = null;

    if (scrollPosition < firstHeading.offsetTop - navbar.offsetHeight - offset) {
      // Scroll position is above the first heading
      activeHeading = {
        heading: firstHeading,
        offset: 0,
        isVisible: true,
      };
    } else if (scrollPosition + windowHeight >= pageHeight - navbar.offsetHeight - offset) {
      // Scroll position is near the bottom of the page
      activeHeading = {
        heading: lastHeading,
        offset: lastHeading.offsetTop - navbar.offsetHeight - offset,
        isVisible: true,
      };
    } else {
      // Scroll position is between headings
      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const headingOffset = heading.offsetTop - navbar.offsetHeight - offset;
        const nextHeadingOffset =
          i < headings.length - 1
            ? headings[i + 1].offsetTop - navbar.offsetHeight - offset
            : Number.POSITIVE_INFINITY;
        const isVisible =
          scrollPosition >= headingOffset && scrollPosition < nextHeadingOffset;

        if (isVisible) {
          activeHeading = {
            heading,
            offset: headingOffset,
            isVisible,
          };
          break;
        }
      }
    }

    const activeLinks = document.querySelectorAll("a.active");

    activeLinks.forEach((link) => {
      link.classList.remove("active");
    });

    if (activeHeading) {
      const activeLink = document.querySelector(
        `#toc a[href="#${activeHeading.heading.id}"]`
      );
      const activeOverlayLink = document.querySelector(
        `#myOverlayNav a[href="#${activeHeading.heading.id}"]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
      if (activeOverlayLink) {
        activeOverlayLink.classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", highlightActiveLink);
  window.addEventListener("resize", highlightActiveLink);

  // Scroll to section on table of contents link click
  const tocLinks = tocElement.querySelectorAll("a");

  tocLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const targetOffset = targetElement.offsetTop - navbar.offsetHeight - offset;
        window.scrollTo({ top: targetOffset, behavior: "smooth" });

        // Remove active class from all links
        const tocLinks = tocElement.querySelectorAll("a");

        tocLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to the clicked link after a short delay
        setTimeout(() => {
          link.classList.add("active");
        }, 100);
      }
    });
  });

  // Function for link-click and scroll-to in overlay mode
  document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.tagName.toLowerCase() === 'a' && target.closest('.overlay-toc-content')) {
      var targetId = target.getAttribute('href').substring(1);
      var targetElement = document.getElementById(targetId);

      if (targetElement) {
        var navbarHeight = document.querySelector('nav').offsetHeight;
        var targetOffset = targetElement.offsetTop - navbarHeight - offset;

        window.scrollTo({
          top: targetOffset,
          behavior: 'smooth'
        });
      }

      event.preventDefault();
      closeTOC();
    }
  });
});

function openTOC() {
  var overlay = document.getElementById("myOverlayToc");
  overlay.style.display = "block";
  document.body.style.overflow = "hidden"; // Disables scrolling of the body content
}

function closeTOC() {
  event.preventDefault(); // Prevent the default scrolling behavior

  var overlay = document.getElementById("myOverlayToc");
  document.body.style.overflow = "auto"; // Enables scrolling of the body content
  overlay.style.display = "none";
}


window.addEventListener("DOMContentLoaded", () => {
  const leftColumn = document.getElementById("leftcolumn");
  const originalTop = leftColumn.offsetTop;

  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= originalTop) {
      leftColumn.style.position = "fixed";
      leftColumn.style.top = "0";
	  leftColumn.style.marginTop = "5%";
    } else {
      leftColumn.style.position = "absolute";
      leftColumn.style.top = "auto";
	  leftColumn.style.marginTop = "0";
    }
  }

  window.addEventListener("scroll", handleScroll);
});
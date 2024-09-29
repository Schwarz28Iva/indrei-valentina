function openNav() {  
  document.getElementById("myTopnav").style.height = "100%";
  
  var topnav = document.getElementById("myTopnav");
  topnav.className = "overlay";
  topnav.style.width = "100%";

  var overlayContent = document.createElement("div");
  overlayContent.className = "overlay-content";
  topnav.appendChild(overlayContent);

  var closeButton = document.createElement("a");
  closeButton.href = "javascript:void(0)";
  closeButton.className = "closebtn";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = closeNav;
  overlayContent.appendChild(closeButton);
  
  // Hide the icon when in overlay mode
  var icon = topnav.querySelector(".icon");
  icon.style.display = "none";
  
  // Add 'nav-open' class to show language switch for screens below 800px
  if (window.innerWidth <= 800) {
    document.body.classList.add('nav-open');
  }
  
  // Remove the window resize event listener
  window.removeEventListener("resize", handleResize);
}

function closeNav() {   
  document.getElementById("myTopnav").style.height = "0%";
  
  var topnav = document.getElementById("myTopnav");
  topnav.className = "topnav";
  topnav.style.width = "";

  var overlayContent = topnav.querySelector(".overlay-content");
  if (overlayContent) {
    topnav.removeChild(overlayContent);
  }

  // Show the icon button
  var icon = topnav.querySelector(".icon");
  icon.style.display = "block";

  // Remove 'nav-open' class when nav is closed (for screens below 800px)
  if (window.innerWidth <= 800) {
    document.body.classList.remove('nav-open');
  }

  // Add the window resize event listener back
  window.addEventListener("resize", handleResize);
}


// Add event listener to handle resolution changes
	function handleResize() {
	  var topnav = document.getElementById("myTopnav");
	  var icon = topnav.querySelector(".icon");
	  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	  
	  if (width > 700 && topnav.className !== "overlay") {
		icon.style.display = "none";
	  } else {
		icon.style.display = "block";
	  }
	}
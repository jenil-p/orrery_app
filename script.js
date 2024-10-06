    function toggleSidebarAndIcon() {
    const sidebar = document.getElementById('sidebar');
    const sidebarBtn = document.getElementById('sidebar-btn');
    
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-300px';
        sidebarBtn.style.left = '0'; // Move the button back
        document.getElementById('icon-expand-side').style.display = 'block';
        document.getElementById('icon-collapse-side').style.display = 'none';
    } else {
        sidebar.style.left = '0px';
        sidebarBtn.style.left = '250px'; // Move the button with the sidebar
        document.getElementById('icon-expand-side').style.display = 'none';
        document.getElementById('icon-collapse-side').style.display = 'block';
    }
}

// function toggleSubList(event) {
//     event.preventDefault();
//     const subList = event.target.nextElementSibling;
    
//     // Close all other sub-lists
//     const allSubLists = document.querySelectorAll('.sub-list');
//     allSubLists.forEach(list => {
//         if (list !== subList) {
//             list.classList.remove('active'); // Close other sub-lists
//         }
//     });

//     // Toggle the clicked sub-list
//     if (subList) {
//         subList.classList.toggle('active'); // Toggle active class
//     }
// }
function toggleSubList(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const subList = event.target.nextElementSibling; // Get the next <ul> (sub-list)

    if (subList) {
        // Toggle the display of the sub-list
        if (subList.classList.contains("show")) {
            subList.classList.remove("show");
        } else {
            subList.classList.add("show");
        }
    }
}

  
function loadSidebar() {
    fetch('sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(sidebarHtml => {
            document.getElementById('sidebar-container').innerHTML = sidebarHtml;
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
}
window.onload = loadSidebar;
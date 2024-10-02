// Sample document scores
        const docScores = [
            [1, 0.32, 0.23, 0.23],
            [2, 0.72, 0.23, 0.88],
            [6, 0.62, 0.43, 0.23]
        ];

        // Section scores for each document
        const secScores = [
            ['Fund Summary', 1, 0.3, 0.4, 0.6],
            ['FINANCIAL STATEMENTS', 2, 0.3, 0.4, 0.6],
            ['Fund Manager', 6, 0.3, 0.4, 0.6]
        ];

        // Function to populate document table
        function pushDocTable(reference) {
            const docHeading = document.getElementById('docHeading');
            const docContent = document.getElementById('docContent');
            docScores.forEach((value) => {
                let thElem = document.createElement('th');
                thElem.setAttribute('scope', 'col');
                let text = document.createTextNode(`D${value[0]}`);
                thElem.appendChild(text);
                docHeading.appendChild(thElem);

                let tdElem = document.createElement('td');
                let button = document.createElement('button');
                button.className = 'btn btn-primary openSectionButton';
                button.id = `openSectionButton${value[0]}`;
                button.setAttribute('data-toggle', 'collapse');
                button.setAttribute('href', '#sectionContainer');
                button.setAttribute('aria-expanded', 'false');
                button.setAttribute('aria-controls', 'sectionContainer');
                button.title = `Click to see section scores for D${value[0]}`;
                button.textContent = `D${value[0]}`;
                tdElem.appendChild(button);
                docContent.appendChild(tdElem);

                // Button click handler to load sections
                button.addEventListener('click', () => {
                    document.getElementById('spinner').style.display = 'block';  // Show spinner
                    setTimeout(() => {
                        document.getElementById('spinner').style.display = 'none';  // Hide spinner
                        populateSections(value[0]);
                    }, 1000);
                });
            });
        }

        // Populate section scores when a document is selected
        function populateSections(docId) {
            const secHeadings = document.getElementById('secHeadings');
            const secContent = document.getElementById('secContent');
            secContent.innerHTML = "";  // Clear previous content

            secScores.forEach((element) => {
                if (element[1] === docId) {
                    let trElem = document.createElement('tr');

                    let thElem = document.createElement('th');
                    thElem.setAttribute('scope', 'row');
                    let button = document.createElement('button');
                    button.className = 'btn btn-primary';
                    button.textContent = element[0];
                    thElem.appendChild(button);
                    trElem.appendChild(thElem);

                    for (let i = 2; i < element.length; i++) {
                        let tdElem = document.createElement('td');
                        let text = document.createTextNode(element[i]);
                        tdElem.appendChild(text);
                        trElem.appendChild(tdElem);
                    }
                    secContent.appendChild(trElem);
                }
            });
        }

        // Sorting functionality for table
        function sortTable(n) {
            const table = document.getElementById("docTable");
            let switching = true;
            let shouldSwitch, i;
            let dir = "asc";
            let switchCount = 0;

            while (switching) {
                switching = false;
                let rows = table.rows;
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    let x = rows[i].getElementsByTagName("TD")[n];
                    let y = rows[i + 1].getElementsByTagName("TD")[n];

                    if (dir === "asc" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    } else if (dir === "desc" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchCount++;
                } else if (switchCount === 0 && dir === "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }

        // Search functionality
        function searchTable() {
            const input = document.getElementById("searchInput");
            const filter = input.value.toUpperCase();
            const table = document.getElementById("docTable");
            const tr = table.getElementsByTagName("tr");

            for (let i = 0; i < tr.length; i++) {
                let td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    let txtValue = td.textContent || td.innerText;
                    tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
                }
            }
        }

        // Chart.js graphical representation of document scores
        function displayChart() {
            const ctx = document.getElementById('scoreChart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['D1', 'D2', 'D6'],  // Document IDs
                    datasets: [{
                        label: 'Document Scores',
                        data: [0.23, 0.88, 0.62],  // Sample document scores
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Initialize the document table and chart
        window.onload = () => {
            pushDocTable();
            displayChart();
        };

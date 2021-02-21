const xhr = new XMLHttpRequest();

xhr.onload = function() {
    if(this.status == 200) {
        try {
            const res = JSON.parse(this.responseText);    
            let header = '';
            let sermonInfo = '';

            //Display Header on HTML page by using the first object within the Timeline array
            header += 
                    `<h1>${res.Timeline[0].Title}</h1>
                    <p>${res.Timeline[0].Description}</p>`;
                            
            document.getElementById('header-info').innerHTML = header;

            // Iterate through Timeline array                
            for (i = 1; i < res.Timeline.length; i++){
                sermonInfo += 
                            `<ul>
                                <li>
                                    <div class="card">
                                        <div class="card-header" id=${res.Timeline[i].Id}>
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target=#${i} aria-expanded="false" aria-controls=${i}>
                                                    <img id="sermon-icon" src=https://arthurfrost.qflo.co.za/${res.Timeline[i].Icon}>
                                                    <div class="sermon-title-category-date">
                                                        <h5 id="sermon-title">${res.Timeline[i].Title}</h5>
                                                        <h6 id="sermon-category">${res.Timeline[i].Category}</h6>
                                                        <h6 id="sermon-date-created">${res.Timeline[i].CreateDate}<h6>
                                                    <div>
                                                </button>
                                            </h5
                                        </div>
                                        <div id=${i} class="collapse" aria-labelledby=${res.Timeline[i].Id} data-parent="#accordionExample">
                                            <div class="card-body">
                                                <img id="sermon-image" src=https://arthurfrost.qflo.co.za/${res.Timeline[i].Image}>
                                                <br>
                                                <audio controls> <source src=https://arthurfrost.qflo.co.za/${res.Timeline[i].Audio}> </audio>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>`;
            }
            document.getElementById('sermon-accordion').innerHTML = sermonInfo;
        } catch (e) {
            console.warn('There was an error. Could not parse!');
        }
    } else {
        console.warn('Did not receive 200 OK from response!')
    }
};

xhr.open('get', 'https://arthurfrost.qflo.co.za/php/getTimeline.php');
xhr.send();
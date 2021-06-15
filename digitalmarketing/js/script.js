$(document).ready(function(){
    var domain = window.location.hostname;
    var urlToOpenPdf = "http://docs.google.com/gview?embedded=true&url=https://"+domain+"/assets/pdf/";
    //** Array with all cards info
    var cards_info = [
        {
            project_name: "rEvolve",
            project_type: "NonProfit Website Redesign and Optimization",
            img_src: "assets/posters/revolve_poster.jpg",
            video_src: "assets/videos/revolve.mp4",
            pdf_src: "Nonprofit_rEvolve.pdf#zoom=FitH",
        },
        {
            project_name: "Riding With Hope",
            project_type: "NonProfit Website Redesign and Optimization",
            img_src: "assets/posters/riding_with_hope.jpg",
            video_src: "",
            pdf_src: "Nonprofit_Riding_With_Hope.pdf#zoom=FitH",
        },
        {
            project_name: "Alamo Drafthouse Cinema",
            project_type: "Loyalty Program",
            img_src: "assets/posters/alamo_poster.jpg",
            video_src: "assets/videos/alamo.mp4",
            pdf_src: "Loyalty_Alamo_Drafthouse_Cinema.pdf#zoom=FitH",
        },
        {
            project_name: "Caribou Coffee",
            project_type: "Loyalty Program",
            img_src: "assets/posters/caribou_poster.jpg",
            video_src: "assets/videos/caribou.mp4",
            pdf_src: "Loyalty_Caribou_Coffee.pdf#zoom=FitH",
        }
    ];

    // Iframes SRC 
    $('iframe').each(function(index){
        $(this).attr('src',urlToOpenPdf+cards_info[index].pdf_src);
    })

    var cards_info_half = Math.ceil(cards_info.length / 2);
    //** Array with 1st half cards info for first Row
    var cards_info_row_1 = cards_info.slice(0, cards_info_half);
    //** Array with 2nd half cards info for second Row
    var cards_info_row_2 = cards_info.slice(-cards_info_half);

    //* create cards & carousel container structure 
    $(".sp_explore-cards-container").each(function(index){
        $(this).append(
            // cards 
            $("<div>", {class: "container cards-container"}).append(
                $("<div>", {id:"row-"+(index+1), class: "row"})
            ),
        );
    });

    // iframes reload 
    $('iframe', window.parent.document).each(function(index) {
        $(this).attr('src', $('#if'+index,window.parent.document).attr('src'));
    });

    //* create cards items
    function createCard(img_src, img_alt, project_name, project_type, element_id){
        var card = 
            $("<div>", {class: "col-container col-md-6"}).append(
                $("<div>", {class: "card"}).append(
                    $("<img>", {class: "card-img-top img-fluid", src: img_src, alt: img_alt, "data-bs-toggle": "modal"}),
                    $("<div>", {class: "card-body"}).append(
                        $("<p>", {class: "card-title"}).append('<span class="project-name-title">Name:</span> '+project_name),
                        $("<p>", {class: "card-text"}).append('<span class="project-type-title">Project type:</span> '+project_type),
                        $("<a>", {class: "btn btn-primary card-btn", "data-bs-toggle": "modal"}).append('View presentation').attr({ "element-id":element_id})
                    )
                )
            );
        return card;
    }

    //* loop into cards_info array for carousel & cards items
    function iterateCardsInfo(n, card_container, array){
        for (var i = 0; i < array.length; ++i) {
            var img_src = array[i].img_src,
                img_alt = array[i].img_alt,
                // pdf_src = urlToOpenPdf + array[i].pdf_src;
                project_name = array[i].project_name,
                project_type = array[i].project_type;
                element_id = i;
            // Cards 
            $(card_container).append(createCard(img_src, img_alt, project_name, project_type, element_id));
        }
    }

    // Add attr to btn cards and carousel items 
    function addAttr(){
        $(".card-btn").each(function(index){
            $(this).attr({"data-bs-target":"#modal-"+index});
        })
        // Click in Image
        $(".card-img-top").each(function(index){
            $(this).attr({"data-bs-target":"#modal-"+index});
        })
    } 

    //* append cards & carousel items to the containers structure 
    iterateCardsInfo(1, "#row-1", cards_info_row_1);
    iterateCardsInfo(2, "#row-2", cards_info_row_2);
    addAttr();
    
    $(".card-img-top, .recording").click(function(){
        // deactivate presentation 
        $(".presentation > button.nav-link").removeClass('active');
        $(".presentation > button.nav-link").attr('aria-selected','false');
        $(".prese").removeClass('show active');
        // activate recording 
        $(".recording > button.nav-link").addClass('active');
        $(".recording > button.nav-link").attr('aria-selected','true');
        $(".reco").addClass('show active');
        // iframes reload 
        $('iframe', window.parent.document).each(function(index) {
            $(this).attr('src', $('#if'+index,window.parent.document).attr('src'));
        });

    })

    $(".card-btn, .presentation").click(function(){
        // deactivate presentation 
        $(".presentation > button.nav-link").addClass('active');
        $(".presentation > button.nav-link").attr('aria-selected','true');
        $(".prese").addClass('show active');
        // activate recording 
        $(".recording > button.nav-link").removeClass('active');
        $(".recording > button.nav-link").attr('aria-selected','false');
        $(".reco").removeClass('show active');
        // iframes reload 
        $('iframe', window.parent.document).each(function(index) {
            $(this).attr('src', $('#if'+index,window.parent.document).attr('src'));
        });
    })

    // When close Modal 
    $(".modal").on('hidden.bs.modal', function () {
    });
 
    // FOOTER
    var d = new Date(), output = d.getFullYear();        
    $("#year").text(output);
});
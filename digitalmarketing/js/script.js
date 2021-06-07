$(document).ready(function(){
    var btnClicked = "";
    var domain = "https://grety22.github.io/test-dm/";
    var urlToOpenPdf = "http://docs.google.com/gview?embedded=true&url="+domain;
    //** Array with all cards info
    var cards_info = [
        {
            project_name: "rEvolve",
            project_type: "NonProfit Website Redesign and Optimization",
            img_src: "assets/revolve_poster.jpg",
            video_src: "assets/videos/revolve.mp4",
            pdf_src: "assets/pdf/revolve.pdf",
        },
        {
            project_name: "Riding With Hope",
            project_type: "NonProfit Website Redesign and Optimization",
            img_src: "assets/riding_with_hope.jpg",
            video_src: "",
            pdf_src: "assets/pdf/riding.pdf",
        },
        {
            project_name: "Alamo Drafthouse Cinema",
            project_type: "Loyalty Program",
            img_src: "assets/alamo_poster.jpg",
            video_src: "assets/videos/alamo.mp4",
            pdf_src: "assets/pdf/alamo.pdf",
        },
        {
            project_name: "Caribou Coffee",
            project_type: "Loyalty Program",
            img_src: "assets/caribou_poster.jpg",
            video_src: "assets/videos/caribou.mp4",
            pdf_src: "assets/pdf/caribou.pdf",
        }
    ];
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
            // carousel
            $("<div>", {class: "carousel carousel-mobile", id:"carousel-cards-"+(index+1), "data-bs-ride": "carousel"}).append(
                $("<div>", {class: "carousel-inner", id: "carousel-inner"}),
                $("<div>", {class: "carousel-indicators", id: "carousel-indicators"}),
            )
        );
    });

    //* create cards items
    function createCard(img_src, img_alt, project_name, project_type, element_id, pdf_src){
        var card = 
            $("<div>", {class: "col"}).append(
                $("<div>", {class: "card"}).append(
                    $("<img>", {class: "card-img-top img-fluid", src: img_src, alt: img_alt, "data-bs-toggle": "modal", "data-bs-target": "#modal"}),
                    $("<div>", {class: "card-body"}).append(
                        $("<p>", {class: "card-title"}).append('<span class="project-name-title">Name:</span> '+project_name),
                        $("<p>", {class: "card-text"}).append('<span class="project-type-title">Project type:</span> '+project_type),
                        $("<a>", {class: "btn btn-primary card-btn", href:pdf_src, target:"_blank"}).append('View presentation').attr({ "element-id":element_id})
                    )
                )
            );
        return card;
    }

    //* create carousel items
    function createCarouselItems(img_src, img_alt, project_name, project_type, element_id, pdf_src){
        var item =
            $("<div>", {class: "carousel-item"}).append(
                $("<img>", {class: "d-block w-100 carousel-img", src: img_src, alt: img_alt, "data-bs-toggle": "modal", "data-bs-target": "#modal"}),
                $("<div>", {class: "carousel-body"}).append(
                    $("<p>", {class: "carousel-title text"}).append('<span class="project-name-title">Name:</span> '+project_name),
                    $("<p>", {class: "carousel-text text"}).append('<span class="project-type-title">Project type:</span> '+project_type),
                    $("<a>", {class: "btn btn-primary carousel-btn", href:pdf_src, target:"_blank"}).append('View presentation').attr({ "element-id":element_id})
                )
            )
        return item;
    }

    //* create carousel indicators
    function createCarouselIndicators(element_id, carousel){
        var indicators =
            $("<button>", {
                type: "button", 
                "data-bs-target": "#carousel-"+carousel,
                "data-bs-slide-to": element_id,
                "aria-label": "Slide "+element_id, 
            })
        return indicators;
    } 

    //* loop into cards_info array for carousel & cards items
    function iterateCardsInfo(n, card_container, carousel_container, array){
        for (var i = 0; i < array.length; ++i) {
            var img_src = array[i].img_src,
                img_alt = array[i].img_alt,
                // pdf_src = urlToOpenPdf + array[i].pdf_src;
                pdf_src = array[i].pdf_src;
                project_name = array[i].project_name,
                project_type = array[i].project_type;
                element_id = i;

            // Cards 
            $(card_container).append(createCard(img_src, img_alt, project_name, project_type, element_id, pdf_src));
            
            // Carousel 
            $(carousel_container+" > .carousel-inner").append(createCarouselItems(img_src, img_alt, project_name, project_type, element_id, pdf_src))
            $(carousel_container+" > .carousel-inner > .carousel-item").first().addClass('active');
            $(carousel_container+" > .carousel-indicators").append(createCarouselIndicators(element_id, 'cards-'+n))
            $(carousel_container+" > .carousel-indicators > button").first().addClass('active').attr("aria-current","true");            
        }
    }

    // Add attr to btn cards and carousel items 
    function addAttr(){
        // Click in View Presentation Btn 
        $(".carousel-btn").each(function(index){
            $(this).attr({"modal-id":index})
        })
        $(".card-btn").each(function(index){
            $(this).attr({"modal-id":index})
        })
        // Click in Image
        $(".card-img-top").each(function(index){
            $(this).attr({"modal-id":index})
        })
        $(".carousel-img").each(function(index){
            $(this).attr({"modal-id":index})
        })
    } 

    // MODAL
    //* create modal carousel items
    function createModalItem(img_src, video_src, project_name){        
        var item =
            $("<div>", {class: "carousel-item"}).append(
                $("<p>", {class: "modal-title"}).append(project_name),
                //** Append Video & PDF container
                $("<div>", {class: "tab-content"}).append(
                    // Video Container 
                    $("<div>", {class: "video-container"}).append(
                        $("<video>", {class: "modal-video", controls: "true", autoplay: "true", poster: img_src}).append(
                            $("<source>", {
                                type: "video/mp4", 
                                src: video_src
                            })
                        )
                    )
                )
            )
        return item;
    }
    //* loop into cards_info array to create all Modal items
    function createModalItems(array){
        for (var i = 0; i < array.length; ++i) {
            // skip 2nd element in cards_info (doesnt have video) 
            if (i === 1) { continue; }
            var video_src = array[i].video_src,
                project_name = array[i].project_name;
                img_src = array[i].img_src;
            $("#carousel-modal > .carousel-inner").append(createModalItem(img_src, video_src, project_name));
        }
    }
   
    //* append cards & carousel items to the containers structure 
    iterateCardsInfo(1, "#row-1", "#carousel-cards-1", cards_info_row_1);
    // 3rd element of cards_info array doesnt have video 
    $(".card-img-top").eq(1).css("cursor", "auto").removeAttr("data-bs-target data-bs-toggle");
    $(".carousel-img").eq(1).css("cursor", "auto").removeAttr("data-bs-target data-bs-toggle");

    iterateCardsInfo(2, "#row-2", "#carousel-cards-2", cards_info_row_2);
    addAttr();
    createModalItems(cards_info);
    
    $(".card-img-top, .carousel-img").click(function(){
        btnClicked = $(this).attr('modal-id');
        if (btnClicked > 1){--btnClicked}
        $("#carousel-modal > .carousel-inner > .carousel-item").removeClass('active').attr("aria-current","false"); 
        $("#carousel-modal > .carousel-inner > .carousel-item").eq(btnClicked).addClass('active').attr("aria-current","true"); 
    })

    // When close Modal 
    var myModalEl = document.getElementById('modal');
    myModalEl.addEventListener('hide.bs.modal', function (event) {
        $("#carousel-modal > .carousel-inner > .carousel-item").each(function(){
            $(this).removeClass('active').attr("aria-current","false"); 
        })
        btnClicked = 0;
    })
 
    // FOOTER
    var d = new Date(), output = d.getFullYear();        
    $("#year").text(output);
});

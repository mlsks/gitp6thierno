/* eslint-disable no-undef */
window.onload = function () {
    // console.log(window.location.search)
    let searchParams = new URLSearchParams(window.location.search)
    let photographerId = searchParams.get("id")
    console.log(
        `Photographer ID : %c${photographerId}`,
        "font-weight: bold; color: green"
    )

    //Instanciation from class PhotographerPage
    let photographerPage = new PhotographerPage()
    photographerPage.display(photographerId)
}

class PhotographerPage {
    constructor() {
        this.photographer = null
        this.medias = []
    }

    // GETPHOTOGRAPHER METHOD
    getPhotographer(id) {
        let resdata = data.photographers
        let resdataFiltered = resdata.filter((data) => data.id == id)
        let resmedia = data.media
        let resmediaFiltered = resmedia.filter(
            (data) => data.photographerId == id
        )
        // console.log(resmediaFiltered)

        // eslint-disable-next-line no-undef
        this.photographer = new Photographer(
            resdataFiltered[0].name,
            resdataFiltered[0].id,
            resdataFiltered[0].country,
            resdataFiltered[0].city,
            resdataFiltered[0].tags,
            resdataFiltered[0].tagline,
            resdataFiltered[0].price,
            resdataFiltered[0].portrait
        )

        for (let i = 0; i < resmediaFiltered.length; i++) {
            let type = "image"
            if (resmediaFiltered[i].image == null) {
                type = "video"
            }
            this.medias.push(new MediaFactory(type, resmediaFiltered[i]))
        }
    }

    // DISPLAY Photographer, Likes and Price, and Gallery
    display(id) {
        this.getPhotographer(id)
        document.getElementById(
            "photographer"
        ).innerHTML = this.photographer.displayPhotographer()

        document.getElementById(
            "price"
        ).innerHTML = this.photographer.displayPrice()

        // Total likes and price for one photographer
        let photographerLikesArray = Array.from(
            this.medias,
            ({ likes }) => likes
        )
        console.log(
            `So many likes : %c${photographerLikesArray}`,
            "color: purple"
        )
        //  Count total likes
        let totalLikes = photographerLikesArray.reduce((a, b) => a + b)
        console.log(
            `total likes :  %c${totalLikes}`,
            "font-weight: bold; color: blue"
        )

        document.getElementById("likes").innerHTML = `
            <li class="cards__likes "> 
                <div class=''>
                <p class='card__text card__price'>
                ${totalLikes} &#10084;
                </p>
                </div>
            </li>
            `

        // ***

        // DISPLAY Photographer Gallery

        let thisMedias = this.medias

        // Unique Tag
        let tagsNames = thisMedias.map((item) => item.tags)
        // Create one array from multidimensioned array
        let merged = [].concat.apply([], tagsNames)
        let uniqueTag = [...new Set(merged)]

        console.log("Tags array : " + uniqueTag)

        // By popularity method
        function byPopularity() {
            let displayByPopularity = ""
            for (let i = 0; i < thisMedias.length; i++) {
                thisMedias.sort(function (a, b) {
                    // Sort by likes
                    return b.likes - a.likes
                })
                displayByPopularity += thisMedias[i].gallery()
            }
            document.getElementById("gallery").innerHTML = displayByPopularity
        }
        // Trigger function (first DOM paint)
        byPopularity()
        // Sorting Methods
        // By Title
        function byTitle() {
            let displayByTitle = ""
            for (let i = 0; i < thisMedias.length; i++) {
                thisMedias.sort(function (a, b) {
                    //Sort Before
                    if ((a.image || a.video) < (b.image || b.video)) {
                        return -1
                    }
                    //Sort after
                    if ((a.image || a.video) > (b.image || b.video)) {
                        return 1
                    }
                    return 0
                })
                displayByTitle += thisMedias[i].gallery()
            }
            document.getElementById("gallery").innerHTML = displayByTitle
        }

        //  By Date
        function byDate() {
            let displayByDate = ""
            for (let i = 0; i < thisMedias.length; i++) {
                thisMedias.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date)
                })
                displayByDate += thisMedias[i].gallery()
            }
            document.getElementById("gallery").innerHTML = displayByDate
        }

        // By Tag
        function byTags() {
            let displayByPopularity = ""

            for (let i = 0; i < thisMedias.length; i++) {
                thisMedias.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date)
                })
                displayByPopularity += thisMedias[i].gallery()
            }

            document.getElementById("gallery").innerHTML = displayByPopularity
        }

        // console.log(
        //     uniqueTag[0] == document.getElementsByClassName("allTags")[2].id
        // )
        console.log(uniqueTag)
        // console.log(document.getElementsByClassName("allTags")[2].id)

        document
            .querySelector(".allTags")
            .addEventListener("click", function (e) {
                if (e.target && e.target.nodeName == "LI") {
                    // List item found!  Output the ID!
                    console.log("List item ", e.target.id, " was clicked!")
                    console.log(e.target)
                    console.log(e.target.id)
                    // app.filterTag(e.target.id)
                }
            })

        document
            .querySelector(".price")
            .addEventListener("click", function (e) {
                if (e.target && e.target.nodeName == "P") {
                    // List item found!  Output the ID!
                    console.log(
                        "List item ",
                        e.target.innerHTML,
                        " was clicked!"
                    )
                    console.log(e.target)
                    console.log(e.target.innerHTML)
                    // app.filterTag(e.target.id)
                }
            })

        // ***

        // Trigger Sorting Method
        let sortPopularity = document.getElementById("popularité")
        let sortTitre = document.getElementById("titre")
        let sortDate = document.getElementById("date")

        let sortTags = document.querySelector(".allTags")

        let newElementGallerySorted = document.querySelector("#gallery")

        // Clear Gallery Fragment
        function clearFragment() {
            var list = document.getElementById("gallery")
            while (list.hasChildNodes()) {
                list.removeChild(list.lastChild)
            }
        }

        // Sort by Tags
        // sortTags.addEventListener("click", function () {
        //     clearFragment()
        //     let newFragment = new DocumentFragment()
        //     byTags()
        //     newElementGallerySorted.appendChild(newFragment)
        // })

        // Sort by Popularité
        sortPopularity.addEventListener("click", function () {
            clearFragment()
            let newFragment = new DocumentFragment()
            byPopularity()
            newElementGallerySorted.appendChild(newFragment)
        })

        // Sort by Titre
        sortTitre.addEventListener("click", function () {
            clearFragment()
            let newFragment = new DocumentFragment()
            byTitle()
            newElementGallerySorted.appendChild(newFragment)
        })

        // Sort by Date
        sortDate.addEventListener("click", function () {
            clearFragment()
            let newFragment = new DocumentFragment()
            byDate()
            newElementGallerySorted.appendChild(newFragment)
        })
    }
}

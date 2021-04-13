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
        // console.log(1)

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
        console.log(resmediaFiltered)

        for (let i = 0; i < resmediaFiltered.length; i++) {
            let type = "image"
            if (resmediaFiltered[i].image == null) {
                type = "video"
            }
            this.medias.push(new MediaFactory(type, resmediaFiltered[i]))
        }
    }

    // DISPLAY MEDIAS METHOD
    display(id) {
        this.getPhotographer(id)
        document.getElementById(
            "photographer"
        ).innerHTML = this.photographer.displayPhotographer()

        document.getElementById(
            "price"
        ).innerHTML = this.photographer.displayPrice()

        let displayByPopularity = ""
        for (let i = 0; i < this.medias.length; i++) {
            this.medias.sort(function (a, b) {
                // Sort by likes
                return b.likes - a.likes

                // Sort by Tagline Alphabetically
                // if (a.image < b.image) {
                //     return -1
                // }
                // if (a.image > b.image) {
                //     return 1
                // }
                // return 0

                // Sort by date
                // return a.date - b.date
            })
            displayByPopularity += this.medias[i].gallery()
        }
        document.getElementById("gallery").innerHTML = displayByPopularity

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

        // document.getElementById("titre").addEventListener("click", function () {
        //     let displayByTitle = ""
        //     for (let i = 0; i < this.medias.length; i++) {
        //         this.medias.sort(function (a, b) {
        //             if (a.image < b.image) {
        //                 return -1
        //             }
        //             if (a.image > b.image) {
        //                 return 1
        //             }
        //             return 0
        //         })
        //         displayByTitle += this.medias[i].gallery()
        //     }
        //     document.getElementById("gallery").innerHTML = displayByTitle
        // })
    }

    // Increment like
}

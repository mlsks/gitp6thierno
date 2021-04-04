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
        this.photographer = new Photographer( //from Cphotographers
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
            this.medias.push(
                new Media( // from Cmedias
                    resmediaFiltered[i].id,
                    resmediaFiltered[i].photographerId,
                    resmediaFiltered[i].image,
                    resmediaFiltered[i].video,
                    resmediaFiltered[i].tags,
                    resmediaFiltered[i].likes,
                    resmediaFiltered[i].date,
                    resmediaFiltered[i].price
                )
            )
        }
        // console.log(this.medias)
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

        document.getElementById("titre").addEventListener("click", function () {
            let displayByTitle = ""
            for (let i = 0; i < this.medias.length; i++) {
                this.medias.sort(function (a, b) {
                    // Sort by Tagline Alphabetically
                    if (a.image < b.image) {
                        return -1
                    }
                    if (a.image > b.image) {
                        return 1
                    }
                    return 0
                })
                displayByTitle += this.medias[i].gallery()
            }
            document.getElementById("gallery").innerHTML = displayByTitle
        })
    }
}

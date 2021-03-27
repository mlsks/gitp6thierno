console.log(data)

window.onload = function () {
    // console.log(window.location.search)
    let searchParams = new URLSearchParams(window.location.search)
    let photographerId = searchParams.get("id")
    console.log(photographerId)

    //Instanciation
    let photographerPage = new PhotographerPage()
    photographerPage.display(photographerId)
}

class PhotographerPage {
    constructor() {
        this.photographer = null
        this.medias = []
    }
    getPhotographer(id) {
        let resdata = data.photographers
        let resdataFiltered = resdata.filter((data) => data.id == id)
        let resmedia = data.media
        let resmediaFiltered = resmedia.filter(
            (data) => data.photographerId == id
        )
        console.log(resmediaFiltered)
        console.log(1)
        // console.log(resdataFiltered[0])
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
            this.medias.push(
                new Media(
                    resmediaFiltered[i].id,
                    resmediaFiltered[i].photographerId,
                    resmediaFiltered[i].image,
                    resmediaFiltered[i].tags,
                    resmediaFiltered[i].likes,
                    resmediaFiltered[i].date,
                    resmediaFiltered[i].price
                )
            )
        }
        console.log(this.medias)
    }

    display(id) {
        this.getPhotographer(id)
        document.getElementById(
            "photographer"
        ).innerHTML = this.photographer.displayPhotographer()

        document.getElementById(
            "price"
        ).innerHTML = this.photographer.displayPrice()
        let displayMedia = ""

        for (let i = 0; i < this.medias.length; i++) {
            displayMedia += this.medias[i].gallery()
        }
        document.getElementById("gallery").innerHTML = displayMedia
    }
}

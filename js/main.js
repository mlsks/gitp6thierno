/* eslint-disable indent */
"use strict"
class App {
    constructor() {
        this.photographers = []
        this.tags = []
        this.displayedPhotographers = []
    }

    async getPhotographers() {
        const url = "./data.json"
        const response = await fetch(url)
        const data = await response.json()
        let resdata = data.photographers
        resdata.forEach((photographer) => {
            this.photographers.push(
                // eslint-disable-next-line no-undef
                new Photographer(
                    photographer.name,
                    photographer.id,
                    photographer.city,
                    photographer.country,
                    photographer.tags,
                    photographer.tagline,
                    photographer.price,
                    photographer.portrait
                )
            )
            this.tags.push(...photographer.tags)
        })
        this.displayedPhotographers = this.photographers
        this.tags = new Set(this.tags)
        console.log(this.displayedPhotographers, this.tags)
    }
    listPhotographers() {
        let output = ""
        this.displayedPhotographers.forEach((photographer) => {
            output += photographer.display()
        })
        document.getElementById("listePhotographes").innerHTML = output
    }

    displayTags() {
        let output = ""
        for (let tag of this.tags) {
            output += `<li class='photographer-tag ${tag}' id="${tag}">#${tag}</li>`
        }
        document.getElementById("allTags").innerHTML = output
    }
    filterTag(tag) {
        this.displayedPhotographers = this.photographers.filter(
            (photographer) => photographer.tags.includes(tag)
        )
        this.listPhotographers()
    }

    async run() {
        await this.getPhotographers()
        this.listPhotographers()
        this.displayTags()
    }
}
let app = new App()
app.run()

document.getElementById("allTags").addEventListener("click", function (e) {
    // e.target is the clicked element!
    // If it was a list item
    if (e.target && e.target.nodeName == "LI") {
        // List item found!  Output the ID!
        console.log("List item ", e.target.id, " was clicked!")
        console.log(e.target)
        console.log(e.target.id)
        app.filterTag(e.target.id)
    }
})

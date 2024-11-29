
class Card {
    constructor() {
        this.card_id = 0
        this.img_src = ''
        this.name = ''
        this.location = ''
        this.into = ''
        this.like_num = 0
        this.photos = []
    }

    init(card_id, img_src, name, location, intro, like_num, photos) {
        this.card_id = card_id
        this.img_src = img_src
        this.name = name
        this.location = location
        this.intro = intro
        this.like_num = like_num
        this.photos = photos
    }

}
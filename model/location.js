class location {
    constructor() {
        this.first = ""
        this.second = ""
        this.third = ""
    }
    init(first, second, third) {
        this.first = first
        this.second = second
        this.third = third
    }
    tostring() {
        return this.first + "-" + this.second + "-" + this.third
    }
}
export default location
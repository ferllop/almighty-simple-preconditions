export class MessageBuilder {
    start = '';
    parts = [];
    end = '';

    setStart(start) {
        this.start = start
        return this
    }

    addPart(part) {
        this.parts.push(part)
        return this
    }

    setEnd(end) {
        this.end = end
        return this
    }

    build() {
        const JOIN_STRING = ', '
        let result = this.start
        result += this.parts.join(JOIN_STRING)
        return result + this.end
    }
}

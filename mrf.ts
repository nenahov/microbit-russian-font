/**
 * Russian font
 */
//% weight=100 color=#f20000 icon="♥"
namespace RussianFont {

    let letters = [" ", "0", "!", "4198532", ".", "4194304", ",", "4456448", "?", "4207150",
        "0", "6595878", "1", "14815428", "2", "15767815", "3", "6590735", "4", "9413964",
        "5", "16268351", "6", "15251592", "7", "1118495", "8", "15252014", "9", "2243118",
        "♥", "4685802", "♦", "4685252", "♠", "11533764", "♣", "4914852", 
		"ⱽ", "11417767", "☺", "15237440", "☻", "18284864",
        "А", "9747750", "Б", "7642151", "В", "7642407", "Г", "1082415", "Д", "18852164",
        "Е", "15768623", "Ё", "15768623", "Ж", "22483413", "З", "7608583", "И", "18470705",
        "Й", "18470709", "К", "9604265", "Л", "18163844", "М", "18405233", "Н", "9747753",
        "О", "6595878", "П", "9741615", "Р", "1088807", "С", "14713902", "Т", "4329631",
        "У", "1118545", "Ф", "4675012", "Х", "18157905", "Ц", "17769769", "Ч", "8665385",
        "Ш", "32167601", "Щ", "17782449", "Ъ", "6625347", "Ы", "20631089", "Ь", "6625346",
        "Э", "7616775", "Ю", "10149545", "Я", "18444892",
        "а", "9747750", "б", "7642151", "в", "7642407", "г", "1082415", "д", "18852164",
        "е", "15768623", "ё", "15768623", "ж", "22483413", "з", "7608583", "и", "18470705",
        "й", "18470709", "к", "9604265", "л", "18163844", "м", "18405233", "н", "9747753",
        "о", "6595878", "п", "9741615", "р", "1088807", "с", "14713902", "т", "4329631",
        "у", "1118545", "ф", "4675012", "х", "18157905", "ц", "17769769", "ч", "8665385",
        "ш", "32167601", "щ", "17782449", "ъ", "6625347", "ы", "20631089", "ь", "6625346",
        "э", "7616775", "ю", "10149545", "я", "18444892",
        "A", "9747750", "B", "7642407", "C", "14713902", "D", "7644455", "E", "15768623", 
		"F", "1088559", "G", "15262766", "H", "9747753", "I", "14815374", "J", "6594847", 
        "K", "9604265", "L", "15762465", "M", "18405233", "N", "18667121", "O", "6595878", 
		"P", "1088807", "Q", "12789030", "R", "18128167", "S", "7608366", "T", "4329631",
		"U", "6595881", "V", "4539953", "W", "18732593", 
        "X", "18157905", "Y", "4329809", "Z", "15763599", 
        "a", "9747750", "b", "7642407", "c", "14713902", "d", "7644455", "e", "15768623", 
		"f", "1088559", "g", "15262766", "h", "9747753", "i", "14815374", "j", "6594847", 
        "k", "9604265", "l", "15762465", "m", "18405233", "n", "18667121", "o", "6595878", 
		"p", "1088807", "q", "12789030", "r", "18128167", "s", "7608366", "t", "4329631",
		"u", "6595881", "v", "4539953", "w", "18732593", 
        "x", "18157905", "y", "4329809", "z", "15763599"]
    // TODO прописные буквы

    /**
     * Показываем битовую маску с нужной яркостью
     * @param mask битовая маска
     * @param br яркость символа
     * @param back яркость фона
     */
    //% group="Screen"
    //% mask.defl=20631089
    //% br.defl=255 br.min=0 br.max=255
    //% back.defl=0 back.min=-1 back.max=255
    //% block="show mask|%mask|brightness|%br|background|%back"
    export function showSlide(mask: number, br: number, back: number): void {
        for (let i = 0; i <= 4; i++) {
            for (let j = 0; j <= 4; j++) {
                let k = 2 ** (i + j * 5)
                if ((mask & k) == k) {
                    led.plotBrightness(i, j, br)
                } else if (back >= 0) {
                    led.plotBrightness(i, j, back)
                }
            }
        }
    }

    /**
    * Get the bit mask of the symbol
    * @param letter symbol from letters
    */
    //% group="Screen"
    //% block="mask $letter"
    export function getLetterMask(letter: string): number {
        for (let l = 0; l <= letters.length / 2 - 1; l++) {
            if (letter == letters[l * 2]) {
                return parseFloat(letters[1 + l * 2])
            }
        }
        return 4207150; // default value = "?" 
    }

    /**
    * Get the bit mask of the current screen without brightness
    */
    //% group="Screen"
    //% block="screen mask"
    export function getScreenMask(): number {
        let result = 0;
        for (let i = 0; i <= 4; i++) {
            for (let j = 0; j <= 4; j++) {
                if (led.point(i, j)) {
                    let k = 2 ** (i + j * 5)
                    result = result + k;
                }
            }
        }
        return result;
    }


    /**
    * Показать мигающую строку
    * @param message строка символов
    * @param tm сколько мс. показывать каждую букву
    */
    //% message.defl="МЫ ♥♥ ИНФОРМАТИКУ!!!"
    //% tm.defl=50 tm.min=10 tm.max=200
    //% group="Message"
    //% block="show $message with delay $tm"
    export function showMessage(message: string, tm: number): void {
        if (tm <= 10) {
            tm = 10
        }
        for (let index = 0; index <= message.length - 1; index++) {
            let mask = getLetterMask(message.charAt(index))
            blinkLetter(mask, tm)
            basic.pause(0.5 * tm)
        }
    }

    function blinkLetter(mask: number, tm: number) {
        if (tm <= 10) {
            tm = 10
        }
        for (let i1 = 0; i1 <= 26; i1++) {
            showSlide(mask, i1 * 8 + 10, 0)
            basic.pause(0.1 * tm)
        }
        for (let i12 = 0; i12 <= 26; i12++) {
            showSlide(mask, 255 - i12 * 8, 0)
            basic.pause(0.4 * tm)
        }
        showSlide(mask, 0, 0)
    }

    /**
    * Показать переходящую строку
    * @param message строка символов
    * @param tm сколько мс. показывать каждую букву
    */
    //% message.defl="МЫ ♥♥ ИНФОРМАТИКУ!!!"
    //% tm.defl=50 tm.min=10 tm.max=200
    //% group="Message"
    //% block="show shadow $message with delay $tm"
    export function showMessageShadow(message: string, tm: number): void {
        if (tm <= 10) {
            tm = 10
        }
        message = message + " "
        let lastMask = 0
        for (let index = 0; index <= message.length - 1; index++) {
            let mask = getLetterMask(message.charAt(index))
            let shadow = lastMask & (~mask)
            for (let i1 = 0; i1 <= 25; i1++) {
                showSlide(lastMask, 255 - i1 * 10 - 10, -1)
                showSlide(mask, i1 * 7 + 10, -1)
                basic.pause(Math.max(1, 0.2 * tm))
            }
            for (let i1 = 0; i1 <= 5; i1++) {
                showSlide(mask, i1 * 11 + 190, 0)
                basic.pause(Math.max(1, 0.1 * tm))
            }
            basic.pause(0.5 * tm)
            lastMask = mask
        }
    }
}
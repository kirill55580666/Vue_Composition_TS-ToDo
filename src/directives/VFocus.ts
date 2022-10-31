import {ObjectDirective} from "vue";

interface ExtendedDirective extends ObjectDirective {
    name: string;
}


const VFocus: ExtendedDirective = {
    mounted(el) {
        el.focus()
    },
    name: 'focus'
}

export default VFocus;
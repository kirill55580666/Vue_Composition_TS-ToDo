import {ObjectDirective} from "vue";

const VIntersection: ObjectDirective = {
    mounted(el, binding) {
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries: any, observer: any) => {
            if (entries[0].isIntersecting) {
                binding.value()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
}

export default VIntersection;
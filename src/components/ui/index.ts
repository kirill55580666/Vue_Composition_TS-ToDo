import MyButton from './MyButton.vue'

interface ComponentRegister {
    name: string;
    component: object;
}

export const GlobalComponents: ComponentRegister[] = [
    {
        name: 'my-button',
        component: MyButton
    }
]
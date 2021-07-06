import getRootDom from "./getRootDom";
import Icon from "../components/Icon";
import style from './mess.module.scss'
export default function (options = {}) {
    const content = options.content || '';
    const type = options.type  || '';
    const duration = options.duration || 1500;
    const container = options.container || document.body;
    const div = document.createElement('div');
    const iconDom = getRootDom(Icon,{ type });
    div.innerHTML = `<span class="${style.icon}">${iconDom.outerHTML}</span><div>${content}<div/>`
    // 设置样式
    const typeClassName = style[`message-${type}`]; //类型样式名
    div.className = `${style.message} ${typeClassName}`

    if(options.container){
        if(getRootDom(container).position === 'static'){
            container.style.position = 'relative';
        }

    }
    container.appendChild(div);

    div.clientWidth;  // 浏览器强行渲染

    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-25px)`;
        div.addEventListener('transitionend',() => {
            div.remove();
            options.callback && options.callback()
        })
    },duration)
}
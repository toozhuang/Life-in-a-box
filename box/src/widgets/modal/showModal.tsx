
/**
 * 此方法为显示 Modal 的方法 ；
 * @param Component
 * @param props
 */
// @ts-ignore
function showModal(Component, props){
    // step 1:  showModal 的作用是要在 Dom 里面插入这个 Modal， 所以首先要找到一个位置
    let div = props.parent;
    if(!div){
        div = document.createElement('div');
        document.body.append(div);
    }

    const close = (trigger={})=>{
        const {triggerCancel = false, triggerOk = false, params = []} = trigger
    }
}



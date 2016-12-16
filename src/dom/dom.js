class dom {
    constructor(selecter){
        let selects = document.querySelectorAll(selecter);
        if(Object.keys(selects).length == 1) {
            this.dom = window;
            return;
        }

        this.dom = selects;
    };

    css(str, value) {
        if(value) {
            this.dom.forEach((v,i,a)=>{
                v.style[str] = value;
            });

            return this;
        }

        return (this.dom[0].style[str] || this);
    };

    clas(str, value) {
        switch(str) {
            case 'get':
                return this.dom[0].className;
            case 'has':
                return this.dom[0].className.indexOf(value) != -1;
            case 'add':
                if(this.dom[0].className.indexOf(value) == -1) {
                    this.dom[0].className = this.dom[0].className + ' value';
                }
                return this;
            case 'remove':
                if(this.dom[0].className.indexOf(value) != -1) {
                    this.dom[0].className = this.dom[0].className.replace(new RegExp(value, 'g'), '');
                }
                return this;
            default:
                return this;
        }
    };

    
}



module.exports = dom;
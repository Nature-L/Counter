/**
 * by: nature
 * 18810153051
 */
!function (global) {
    /**
     * @param option object
     * @param option.digit
     * @param option.data
     */
    global.updateNumber = function(option) {
        var options = setConfig(option);
        var newNumber = cover(options.data, options.digit);
        var oldNumber = getOldNumber();
        initDom(options.digit, oldNumber);
        for(var i=0, l=newNumber.length; i<l; i++){
            run(newNumber[i], oldNumber[i], options.speed, i);
        }
    };
    function run(newNumber, oldNumber, speed, n) {
        var difference = newNumber - oldNumber;
        if(difference < 0){
            difference += 10;
        }
        var t = speed / difference;
        function increase() {
            if(difference < 1){
                clearInterval(TT);
                return;
            }
            difference--;
            var start = document.querySelectorAll(".number-child")[n];
            var current = start.querySelector(".active");
            var nextNode = nextElement(current);
            current.classList.remove("active");
            current.style.cssText = "top: 150%; transition: top "+t/1000+"s linear;";
            setTimeout(function () {
                current.style.cssText = "top: -150%; transition: top 0s linear;";
            }, t);
            if(nextNode){
                nextNode.style.cssText = "top: 0; transition: top "+t/1000+"s linear;";
                nextNode.classList.add("active");
            }else{
                start.childNodes[0].classList.add("active");
                start.childNodes[0].style.cssText = "top: 0; transition: top "+t/1000+"s linear;";
            }
        }
        var TT = setInterval(increase, t);
    }
    function carry(ele, t) {
        var prev = prevElement(ele);
        if(prev){
            var current = prev.querySelector(".active");
            var nextNode = nextElement(current);
            current.classList.remove("active");
            current.style.cssText = "top: 150%; transition: top "+t/1000+"s linear;";
            setTimeout(function () {
                current.style.cssText = "top: -150%; transition: top 0s linear;";
            }, t);
            if(nextNode){
                nextNode.style.cssText = "top: 0; transition: top "+t/1000+"s linear;";
                nextNode.classList.add("active");
            }else{
                prev.childNodes[0].classList.add("active");
                prev.childNodes[0].style.cssText = "top: 0; transition: top "+t/1000+"s linear;";
                carry(prev, t);
            }
        }
    }
    function nextElement(ele) {
        var next = ele.nextSibling;
        if(next){
            if(next.nodeType !== 1){
                next = next.nextSibling;
            }
            return next;
        }else{
            return null;
        }
    }
    function prevElement(ele) {
        var prev = ele.previousSibling;
        if(prev){
            if(prev.nodeType !== 1){
                prev = prev.previousSibling;
            }
            return prev;
        }else{
            return null;
        }
    }
    function setConfig(option) {
        option = option || {};
        option.data = option.data || 0;
        option.digit = option.digit || 4;
        option.speed = option.speed || 1000;
        return option;
    }
    function getOldNumber() {
        var actives = document.querySelectorAll(".number .active");
        var oldNumber = "";
        if(actives.length > 0){
            for(var i=0, l=actives.length; i<l; i++){
                oldNumber = oldNumber + actives[i].innerHTML;
            }
        }else {
            oldNumber = '0000';
        }
        return oldNumber;
    }
    function initDom(digit, data) {
        var number = document.querySelector(".number");
        number.innerHTML = '';
        var html = ''+
            '<p>0</p>'+
            '<p>1</p>'+
            '<p>2</p>'+
            '<p>3</p>'+
            '<p>4</p>'+
            '<p>5</p>'+
            '<p>6</p>'+
            '<p>7</p>'+
            '<p>8</p>'+
            '<p>9</p>';
        for(var i=0, l=digit; i<l; i++){
            var div = document.createElement("div");
            div.className = "number-child";
            div.innerHTML = html;
            number.appendChild(div);
            div.children[data[i]].classList.add("active");
            div.children[data[i]].style.cssText = "top: 0;";
        }
    }
    function cover(data, digit) {
        return (Array(digit).join(0) + data).slice(-digit);
    }
}(window);
updateNumber({
   data: 5385,
   digit: 4,
   speed: 1000
});
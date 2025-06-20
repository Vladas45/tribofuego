var ContentHeight = new Class({
    initialize: function(){
        this.mod = new Array(0, 91, 109, 123, 151, 210, 259, 278, 327, 383, 494); /* posledni je max + 1. */
        this.contentMax = 403;
        var content = $('content');
        var sizeY = content.getSize()['y'];
        /* 91, 109, 123, 151 - 164, 210, 259, 278, 327, 383; max=403 */
        content.setStyle("height", this.heightToFix(sizeY));
    },
    heightToFix: function(sizeY) {
        var rest = sizeY % this.contentMax;
        var k = Math.floor(sizeY / this.contentMax);
        var fix;
        for (i=0; i<this.mod.length-1; i++) {
            if (rest > this.mod[i] && rest < this.mod[i+1]) {
                fix = this.mod[i+1];
                break;
            }
        }
        //alert(sizeY + " " + rest + " " + k + " " + fix);
        return k*this.contentMax + fix - 50;
    }
});

window.addEvent('load', function(){
    var myContentHeight = new ContentHeight();
}.bind(this));

new Vue({
    name: 'notebook',
    el: '#notebook',
    data(){
        return {
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null,
            isCollection: JSON.parse(localStorage.getItem('isCollection')) || false
        }
    },
    computed: {
        // 计算属性，当函数中的数值发生变化，可以返回一个新的值
        selectedNote(){
            return this.notes.find(note => note.id === this.selectedId)
        },
        notePreview(){
            return this.selectedNote ? marked(this.selectedNote.content) : ''
            // marked('## title') --> <h2>title</h2>
        },
        WordsCount(){
            if(this.selectedNote){
                var s = this.selectedNote.content;
                // s = s.replace(/\n/g, '');//换行转换成空格
                // s = s.replace(/(^\s*)|(\s*$)/gi, '');//将多个空格转换成一个
                // s = s.replace(/\s\s+/gi, ' ');//返回空格数量
                return s.length
            }
        }
    },
    watch: {
        // 侦听改变 当数值发生变化时 返回被监听属性的新值与旧值
        // watch以键值对存在 把侦听属性的名字作为key,把侦听选项对象作为value
        // 必须有一个handler(newVal, oldVal);
        notes: {
            handler: 'saveNotes',
            deep:true
        },
        selectedId:{
            handler(val){
                localStorage.setItem('selected-id', val);
            }
        }
    },
    methods: {
        saveNotes(){
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },
        addNote(){
            const time = Date.now();//1970到现在的毫秒数 Type is Number
            var createdTiem = new Date();
            const note = {
                id: String(time),
                title: createdTiem.getFullYear()+'-'+ this.fix((createdTiem.getMonth()+1), 2) +'-'+ this.fix(createdTiem.getDate(), 2),
                content: '**Hi!** The notebook is '  + (this.notes.length + 1),
                created: createdTiem.getFullYear()+'/'+ this.fix((createdTiem.getMonth()+1), 2) +'/'+ this.fix(createdTiem.getDate(), 2) + '  ' + this.fix(createdTiem.getHours(), 2) + ':' + createdTiem.getMinutes() + ':'+ createdTiem.getSeconds(),
                favorite: this.isCollection,
                showNote: true
            }
            this.notes.push(note);
            // console.log(this.notes);
            // this.selectNote(note)
        },
        selectNote(note){
            this.selectedId = note.id;
            console.log(this.selectedId, this.selectedNote);
        },
        deleteNote(){
            if(this.selectedNote && confirm("Delete is note?")){
                var index = this.notes.indexOf(this.selectedNote);
                if(index !== -1){
                    this.notes.splice(index, 1);
                    if(this.notes){
                        localStorage.setItem('selected-id', this.notes[0].id);
                        this.selectedId = this.notes[0].id
                    }
                }
            }
        },
        favoriteNote(){
            this.selectedNote.favorite = !this.selectedNote.favorite;
        },
        showCollection(){
            this.isCollection = !this.isCollection;
            localStorage.setItem('isCollection', this.isCollection);
            if(this.isCollection){
                for(var i=0;i< this.notes.length; i++){
                    this.notes[i].showNote = this.notes[i].favorite;
                }
            }else{
                for(var i=0;i< this.notes.length; i++){
                    this.notes[i].showNote = true;
                }
            }
            console.log(this.isCollection);
        },
        fix(num, length) {
            return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
          }
          
    }
})

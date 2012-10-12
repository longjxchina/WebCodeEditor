﻿var editor;

// 设置编辑器的高度
function initEditor() {
    CodeMirror.modeURL = "../../Scripts/Codemirror/mode/%N/%N.js";
    editor = CodeMirror.fromTextArea(document.getElementById("txtCode"), {
        //mode: "text/xml",
        mode: "text/x-csharp",
        indentUnit: 4, 
        matchBrackets: true,
        lineNumbers: true,
        
        // 高亮显示当前行
        onCursorActivity: function () {
            editor.setLineClass(hlLine, null, null);
            hlLine = editor.setLineClass(editor.getCursor().line, null, "activeline");
        },

        // 自动闭合标签设置
        extraKeys: {
            "'>'": function (cm) { cm.closeTag(cm, '>'); },
            "'/'": function (cm) { cm.closeTag(cm, '/'); }
        },
        wordWrap: true
    });

    // 高亮显示当前行
    var hlLine = editor.setLineClass(0, "activeline");

    $(".CodeMirror").css({ "background-color": "white" });
}

function changeMode(val) {
    var arrVals = val.split(":"),
        loadJs = arrVals[0],
        mode = arrVals[1];

    editor.setOption("mode", mode);
    CodeMirror.autoLoadMode(editor, loadJs);

    if (mode == "text/html") {        
        CodeMirror.autoLoadMode(editor, "htmlmixed");
    }
}
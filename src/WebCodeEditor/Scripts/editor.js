var editor;
var previewDelay;

// 设置编辑器的高度
function initEditor() {
    CodeMirror.modeURL = "../../Scripts/Codemirror/mode/%N/%N.js";
    editor = CodeMirror.fromTextArea(document.getElementById("txtCode"), {        
        mode: "text/html",
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
        wordWrap: true,
        onChange: function () {
            clearTimeout(previewDelay);
            previewDelay = setTimeout(updatePreview, 300);
        }
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

    if (mode === "text/html") {
        $(".for_preview").show();
    }
    else {
        $(".for_preview").hide();
    }
}

// 预览html
function updatePreview() {    
    var mode = editor.getOption("mode");

    if (mode == "text/html") {
        $("#previewHtml").show();      
        $("#previewHtml").contents().find("body").html(editor.getValue());
    }
    else {
        $("#previewHtml").hide();
        $("#previewHtml").contents().find("body").html("");
    }
}
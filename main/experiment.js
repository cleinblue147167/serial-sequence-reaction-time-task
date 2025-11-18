    /*************** EXPERIMENT START ***************/

function expStart() {

    // variable creation

    if (isOffline == true) {
        variableCreation(subject.value, session.value)
    }
    else {
        variableCreation()
    }

    // timeline creation and run

    const timeline = timelineCreation();
    const images = ["../static/images/ASRT_en.gif", "../static/images/ASRT_hu.gif", "../static/images/keyboard.bmp", "../static/images/dalmata.jpg"]; //preload memo logo (stimuli images are preloaded automatically)

    jsPsych.init({
        timeline: timeline,
        preload_images: images,
        on_data_update: function () {
            dataUpdate()
        },
        on_close: function () {
            // 离线模式：直接保存本地退出数据
            jsPsych.data.get().localSave("csv", "ASRT_quit_output.csv");
        },
     on_finish: function () {
        // 默认离线行为：保存本地 CSV（触发浏览器下载）
        jsPsych.data.get().localSave("csv", "ASRT_output.csv");
    }
    })
}
/*************** EXPERIMENT START (GitHub Pages Version) ***************/

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
    const images = ["../static/images/ASRT_en.gif", "../static/images/ASRT_hu.gif", "../static/images/keyboard.bmp", "../static/images/dalmata.jpg"];

    jsPsych.init({
        timeline: timeline,
        preload_images: images,
        on_data_update: function () {
            dataUpdate()
        },
        on_close: function () {
            // 用户意外关闭页面时：自动下载数据
            jsPsych.data.get().localSave("csv", "ASRT_quit_output_" + variables.subject_id + ".csv");
        },
        on_finish: function () {
            // 实验正常结束时：自动下载 CSV 文件
            var filename = "ASRT_" + variables.subject_id + "_session" + variables.session_number + ".csv";
            jsPsych.data.get().localSave("csv", filename);
            
            // 显示感谢信息
            document.querySelector('.jspsych-content').innerHTML = 
                '<div style="text-align:center; padding: 50px;">' +
                '<h2>实验已完成！</h2>' +
                '<p>数据文件已自动下载到您的电脑。</p>' +
                '<p>文件名：' + filename + '</p>' +
                '<p>请将此文件发送给实验主持人。谢谢！</p>' +
                '</div>';
        }
    })
}
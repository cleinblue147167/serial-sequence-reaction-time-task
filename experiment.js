function expStart() {

    // 创建变量
    if (isOffline == true) {
        variableCreation(subject.value, session.value)
    }
    else {
        variableCreation()
    }

    // 创建实验时间线并运行
    const timeline = timelineCreation();
    
    // 图片路径更新为 static/images/
    const images = [
        "static/images/ASRT_en.gif", 
        "static/images/ASRT_hu.gif", 
        "static/images/keyboard.bmp", 
        "static/images/dalmata.jpg"
    ];

    jsPsych.init({
        timeline: timeline,
        preload_images: images,
        on_data_update: function () {
            dataUpdate()
        },
        on_close: function () {
            // 用户意外关闭时保存数据
            if(isOffline == true) {
                jsPsych.data.get().localSave("csv", "ASRT_subject" + subject.value + "_session_" + session.value + "_quit_output.csv");
            } else {
                var filename = "ASRT_" + variables.subject_id + "_quit_output.csv";
                jsPsych.data.get().localSave("csv", filename);
            }            
        },
        on_finish: function () {
            // 实验正常结束时保存数据
            if(isOffline == true) {
                jsPsych.data.get().localSave("csv", "ASRT_subject" + subject.value + "_session_" + session.value + "_output.csv");
            } else {
                // 在线模式：生成包含被试ID和设备信息的文件名
                var filename = "ASRT_" + variables.subject_id + "_session" + variables.session_number + ".csv";
                jsPsych.data.get().localSave("csv", filename);
                
                // 显示完成信息
                document.body.innerHTML = 
                    '<div style="text-align:center; padding: 50px; font-family: Arial, sans-serif;">' +
                    '<h2 style="color: #2ecc71;">✓ 实验已完成！</h2>' +
                    '<p style="font-size: 18px;">数据文件已自动下载到您的电脑</p>' +
                    '<p style="font-size: 16px; color: #555;">文件名：<code style="background: #f0f0f0; padding: 5px;">' + filename + '</code></p>' +
                    '<hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">' +
                    '<p style="font-size: 14px; color: #777;">请将此文件发送给实验主持人</p>' +
                    '<p style="font-size: 14px; color: #777;">谢谢您的参与！</p>' +
                    '</div>';
            }         
        }
    })
}

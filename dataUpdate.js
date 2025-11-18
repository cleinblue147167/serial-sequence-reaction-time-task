function dataUpdate() {  

    // 获取当前试次数据
    let lastTrialMinus1 = jsPsych.data.get().last(2).values()[0]
    let lastTrial = jsPsych.data.get().last(1).values()[0]


    if (typeof (lastTrial.target) != "undefined") {
        if (lastTrialMinus1.correct === false) {
            if (lastTrial.target === lastTrialMinus1.target) {
                lastTrial.first_response = 0
            }
        }
        lastTrial.correct_pos = parseInt(lastTrial.target[3])+1
        lastTrial.correct_resp_button = responseKeys[0][parseInt(lastTrial.target[3])]
        lastTrial.resp_button = String.fromCharCode(lastTrial.key_press).toLowerCase()
        if (lastTrial.trial_number == lastTrialMinus1.trial_number){
            lastTrial.cumulative_RT = lastTrial.rt + lastTrialMinus1.cumulative_RT
        }
        else {
            lastTrial.cumulative_RT = lastTrial.rt
        }

        // 计算三元组类型
        var areTrialsCorrect = jsPsych.data.get().select("correct").values;
        let lengthOfTrials = areTrialsCorrect.length
        let isCurrentCorrect = lastTrial.correct

        var secondTripletElementIndex =
            isCurrentCorrect ? areTrialsCorrect.lastIndexOf(true, areTrialsCorrect.lastIndexOf(true)-1) :
            areTrialsCorrect.lastIndexOf(true)

        var thirdTripletElementIndex = areTrialsCorrect.lastIndexOf(true,secondTripletElementIndex-1)

        // 定义三元组元素
        if(lastTrial.trial_number == 1) {
            actualTriplet = ["","",lastTrial.correct_pos]
        }
        else if (lastTrial.trial_number == 2) {
            actualTriplet = ["",jsPsych.data.get().last(lengthOfTrials-secondTripletElementIndex).values()[0].correct_pos, lastTrial.correct_pos]
        }
        else {
            actualTriplet = [jsPsych.data.get().last(lengthOfTrials-thirdTripletElementIndex).values()[0].correct_pos,jsPsych.data.get().last(lengthOfTrials-secondTripletElementIndex).values()[0].correct_pos, lastTrial.correct_pos];
        }

        lastTrial.actual_triplet = actualTriplet.join().replace(/,/g, "");

        // 根据三元组确定类型
        if (lastTrial.is_practice == 1 || lastTrial.trial_number <= firstValidTrial) {
            lastTrial.triplet_type = "X"; // 排除的试次
        }
        else if ((variables.usedSequenceString.includes(lastTrial.actual_triplet[0] + lastTrial.actual_triplet[2])) || (variables.usedSequenceString[3] + variables.usedSequenceString[0] === lastTrial.actual_triplet[0] + lastTrial.actual_triplet[2])){
            lastTrial.triplet_type = "H"; // 高概率三元组
        }
        else if (actualTriplet[0] == actualTriplet[1] && actualTriplet[1] == actualTriplet[2]) {
            lastTrial.triplet_type = "R"; // 重复
        }
        else if (actualTriplet[0] == actualTriplet[2] && actualTriplet[0] != actualTriplet[1]) {
            lastTrial.triplet_type = "T"; // 三重
        }
        else {
            lastTrial.triplet_type = "L"; // 低概率三元组
        }
    }
    
    // 获取浏览器交互数据
    let interactionData = jsPsych.data.getInteractionData()
    const interactionDataOfLastTrial = interactionData.filter({'trial': lastTrial.trial_index}).values();
    if (interactionDataOfLastTrial) {
        lastTrial.browser_events = JSON.stringify(interactionDataOfLastTrial)
    }
}

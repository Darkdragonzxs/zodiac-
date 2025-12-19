(() => {
    const autoAnswer = () => {
        const { stateNode: { state: { question, stage, feedback }, props: { client: { question: pquestion } } } } = Object.values(
            (function react(r = document.querySelector("body > div")) {
                return Object.values(r)[1]?.children?.[0]?._owner?.stateNode || null;
            })()
        )?.[1]?.children?.[0]?._owner || {};
        try {
            if (question?.qType !== "typing") {
                if (stage !== "feedback" && !feedback) {
                    const answerIndex = (question || pquestion).answers.findIndex((x, i) => (question || pquestion).correctAnswers.includes(x));
                    document.querySelector(`[class*="answerContainer"]:nth-child(${answerIndex + 1})`)?.click();
                } else {
                    document.querySelector('[class*="feedback"]')?.firstChild?.click();
                }
            } else {
                const answer = question.answers[0];
                Object.values(document.querySelector("[class*='typingAnswerWrapper']"))[1]?.children?.[0]?.sendAnswer?.(answer);
            }
        } catch { }
    };
    autoAnswer();
})();

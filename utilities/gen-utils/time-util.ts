export interface TimeLineFreqMap {
    [hour: number]: number;
}

export function getInitialTimeLineFreqMap() {
    const freqMap: TimeLineFreqMap = {};
    for (let i = 0; i < 24; i++) {
        freqMap[i] = 0;
    }
    return freqMap;
}

import {ScoreCounter} from "./score-counter";

export class DummyScoreCounter implements ScoreCounter {

    count(): number {
        return null;
    }
}
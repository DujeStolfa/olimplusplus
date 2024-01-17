import Phrase from "./Phrase";

interface Word {
  wordid: number;
  croatianname: string;
  foreignname: string;
  audiopath: string;
  phrases?: Phrase[],
}

export default Word
export interface ILineReader {
    addListener(event: 'line' | 'close', cb: (line?: string) => void);
}
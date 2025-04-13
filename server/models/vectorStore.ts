class VectorStore {
    private vectors: Map<string, number[]>;

    constructor() {
        this.vectors = new Map();
    }

    addVector(id: string, vector: number[]): void {
        this.vectors.set(id, vector);
    }

    getVector(id: string): number[] | undefined {
        return this.vectors.get(id);
    }

    search(queryVector: number[], topK: number): string[] {
        const distances: { id: string; distance: number }[] = [];

        this.vectors.forEach((vector, id) => {
            const distance = this.calculateDistance(queryVector, vector);
            distances.push({ id, distance });
        });

        distances.sort((a, b) => a.distance - b.distance);
        return distances.slice(0, topK).map(item => item.id);
    }

    private calculateDistance(vectorA: number[], vectorB: number[]): number {
        return Math.sqrt(vectorA.reduce((sum, value, index) => sum + Math.pow(value - vectorB[index], 2), 0));
    }
}

export default VectorStore;
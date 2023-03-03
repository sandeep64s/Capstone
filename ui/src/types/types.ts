export type TrainingType = {
    trainingId?: string,
    trainerId?: string,
    traineeId?: string,
    trainingStartDate?: string,
    trainingEndDate?: string,
    title?: string,
    description?: string,
    techStack?: string,
    isDeleted?: boolean,
    trainingDuration?: string,
    totalTrainees?: number
}
export type EditTrainingProps = {
    toggleEditModal: () => void,
    trainingData: TrainingType
}
export type TrainingProps = {
    training: TrainingType,
    details: Boolean,
    editModalHandler: Function
}

export type ViewTrainingProps = {
    training: TrainingType,
    toggleEditModal: Function
}

export type AttendanceType = {
    traineeId: number,
    email: string,
    name: string,
    attendance: string
}

export type AttendanceWithoutSessionType = {
    traineeId: number,
    email: string,
    name: string,
    mattendance: string,
    eattendance: string,
}

export type SubmitAttendanceType = {
    traineeId: number,
    email: string,
    name: string,
    traineesPresent: number[]
}
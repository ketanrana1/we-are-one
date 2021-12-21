import dayjs from "dayjs";

export function getDeliveryDate() {
    const day = dayjs().day();
    let freeDeliveryDays = 3;
    let paidDeliveryDays = 1;

    if (day === 5) {
        freeDeliveryDays += 2;
        paidDeliveryDays += 2;
    } else if (day === 6) {
        freeDeliveryDays += 1;
        paidDeliveryDays += 1;
    }

    const free = dayjs().add(freeDeliveryDays, 'day');
    const paid = dayjs().add(paidDeliveryDays, 'day');
    return {
        free,
        paid
    }
}

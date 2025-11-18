export enum CargoEmpleado {
    Gerente = 'Gerente',
    Supervisor = 'Supervisor',
    Cajero = 'Cajero',
    Vendedor = 'Vendedor',
    Repositor = 'Repositor',
    Limpieza = 'Limpieza'
}

export const cargosOptions = Object.values(CargoEmpleado).map(cargo => ({
    label: cargo,
    value: cargo
}));
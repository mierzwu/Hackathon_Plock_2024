document.addEventListener('DOMContentLoaded', () => {
    const heatingType = document.getElementById('TYP_PIECA');
    const heatingUsageContainer = document.getElementById('OGRZEWANIE');
    const cwuUsageContainer = document.getElementById('CWU');
    const heatPumpContainer = document.getElementById('POMPA_CIEPLA');
    const fuelTypeContainer = document.getElementById('PALIWO');

    const thermalOption = document.getElementById('THERMAL_OPTION');
    const completedSection = document.getElementById('COMPLETED');
    const planningSection = document.getElementById('PLANNING');
    const wallsInsulatedYes = document.getElementById('wallsInsulatedYes');
    const wallsPlanningYes = document.getElementById('wallsPlanningYes');
    const wallsThicknessContainer = document.getElementById('WALLS_THICKNESS');
    const planningWallsThicknessContainer = document.getElementById('PLANNING_WALLS_THICKNESS');

    heatingType.addEventListener('change', () => {
        const selectedType = heatingType.value;

        heatingUsageContainer.style.display = selectedType === 'solidFuel' ? 'none' : 'block';
        cwuUsageContainer.style.display = selectedType === 'solidFuel' ? 'none' : 'block';
        heatPumpContainer.style.display = selectedType === 'renewableEnergy' ? 'block' : 'none';
        fuelTypeContainer.style.display = selectedType === 'solidFuel' ? 'block' : 'none';
    });

    thermalOption.addEventListener('change', () => {
        const selectedOption = thermalOption.value;

        completedSection.style.display = selectedOption === 'completed' ? 'block' : 'none';
        planningSection.style.display = selectedOption === 'planning' ? 'block' : 'none';
    });

    wallsInsulatedYes.addEventListener('change', () => {
        wallsThicknessContainer.style.display = wallsInsulatedYes.checked ? 'block' : 'none';
    });

    wallsPlanningYes.addEventListener('change', () => {
        planningWallsThicknessContainer.style.display = wallsPlanningYes.checked ? 'block' : 'none';
    });

    // Initial visibility setup based on default values
    const selectedType = heatingType.value;
    heatingUsageContainer.style.display = selectedType === 'solidFuel' ? 'none' : 'block';
    cwuUsageContainer.style.display = selectedType === 'solidFuel' ? 'none' : 'block';
    heatPumpContainer.style.display = selectedType === 'renewableEnergy' ? 'block' : 'none';
    fuelTypeContainer.style.display = selectedType === 'solidFuel' ? 'block' : 'none';

    const selectedOption = thermalOption.value;
    completedSection.style.display = selectedOption === 'completed' ? 'block' : 'none';
    planningSection.style.display = selectedOption === 'planning' ? 'block' : 'none';
    wallsThicknessContainer.style.display = wallsInsulatedYes.checked ? 'block' : 'none';
    planningWallsThicknessContainer.style.display = wallsPlanningYes.checked ? 'block' : 'none';
});

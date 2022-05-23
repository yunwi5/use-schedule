// chart js no legend, no grid, no axis config
export const removingOptions = {
    responsive: true,
    plugins: {
        // Removing legend
        legend: {
            display: false,
        },
        // Removing title on the top
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            // Remove x-axis grid
            grid: {
                display: false,
                // Remove x-axis bottom border
                drawBorder: false,
            },
        },
        y: {
            // Remove y-axis label
            ticks: {
                display: false,
            },
            // Remove y-axis grid
            grid: {
                display: false,
                // Remove y-axis left border
                drawBorder: false,
            },
        },
    },
};

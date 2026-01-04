// Theater Configuration
const theaterConfig = {
    section1Rows: 4,  // First section: 4 rows (A-D)
    section2Rows: 4,  // Second section: 4 rows (E-H) - identical to first
    section3Rows: 7,  // Third section: 7 rows (I-O)
    leftBlockCols: 4,
    centerBlockCols: 10,
    rightBlockCols: 4,
    seatPrice: 12.50,
    occupiedSeats: new Set() // Will be populated with random occupied seats
};

// Helper to get total rows
function getTotalRows() {
    return theaterConfig.section1Rows + theaterConfig.section2Rows + theaterConfig.section3Rows;
}

// Helper to get columns for a specific block
function getColsForBlock(blockName) {
    return blockName === 'center' ? theaterConfig.centerBlockCols : theaterConfig.leftBlockCols;
}

// State Management
const state = {
    selectedSeats: new Set(),
    currentSector: null, // 'left', 'center', 'right', or null for all
    isMobile: window.innerWidth <= 768
};

// Initialize occupied seats (simulating some seats already booked)
function initializeOccupiedSeats() {
    const totalRows = getTotalRows();
    const totalSeats = totalRows * (theaterConfig.leftBlockCols + theaterConfig.centerBlockCols + theaterConfig.rightBlockCols);
    const occupiedCount = Math.floor(totalSeats * 0.15); // 15% of seats occupied
    
    for (let i = 0; i < occupiedCount; i++) {
        const row = Math.floor(Math.random() * totalRows) + 1;
        const block = ['left', 'center', 'right'][Math.floor(Math.random() * 3)];
        const cols = getColsForBlock(block);
        const col = Math.floor(Math.random() * cols) + 1;
        const seatId = `${String.fromCharCode(64 + row)}-${block}-${col}`;
        theaterConfig.occupiedSeats.add(seatId);
    }
}

// Create section divider
function createSectionDivider() {
    const divider = document.createElement('div');
    divider.className = 'section-divider';
    return divider;
}

// Generate seat map
function generateSeatMap(sector = null) {
    const seatMap = document.getElementById('seatMap');
    seatMap.innerHTML = '';
    
    let rowNumber = 1;
    
    // Section 1: 4 rows (A-D)
    for (let i = 0; i < theaterConfig.section1Rows; i++) {
        const rowLabel = String.fromCharCode(64 + rowNumber); // A, B, C, D
        const rowElement = createSeatRow(rowLabel, rowNumber, sector);
        seatMap.appendChild(rowElement);
        rowNumber++;
    }
    
    // Section divider between Section 1 and Section 2
    if (!sector) {
        const divider1 = createSectionDivider();
        seatMap.appendChild(divider1);
    }
    
    // Section 2: 4 rows (E-H) - identical to section 1
    for (let i = 0; i < theaterConfig.section2Rows; i++) {
        const rowLabel = String.fromCharCode(64 + rowNumber); // E, F, G, H
        const rowElement = createSeatRow(rowLabel, rowNumber, sector);
        seatMap.appendChild(rowElement);
        rowNumber++;
    }
    
    // Section divider between Section 2 and Section 3
    if (!sector) {
        const divider2 = createSectionDivider();
        seatMap.appendChild(divider2);
    }
    
    // Section 3: 7 rows (I-O)
    for (let i = 0; i < theaterConfig.section3Rows; i++) {
        const rowLabel = String.fromCharCode(64 + rowNumber); // I, J, K, L, M, N, O
        const rowElement = createSeatRow(rowLabel, rowNumber, sector);
        seatMap.appendChild(rowElement);
        rowNumber++;
    }
}

function createSeatRow(rowLabel, rowNumber, sector) {
    const rowElement = document.createElement('div');
    rowElement.className = 'seat-row';
    
    const label = document.createElement('div');
    label.className = 'row-label';
    label.textContent = rowLabel;
    rowElement.appendChild(label);
    
    // Show all blocks when no sector is selected, or show only the selected sector
    if (!sector) {
        // Show all blocks with aisles between them
        // Left block
        const leftBlock = createSeatBlock('left', rowNumber, theaterConfig.leftBlockCols);
        rowElement.appendChild(leftBlock);
        
        // Aisle between left and center
        const aisle1 = document.createElement('div');
        aisle1.className = 'aisle';
        rowElement.appendChild(aisle1);
        
        // Center block
        const centerBlock = createSeatBlock('center', rowNumber, theaterConfig.centerBlockCols);
        rowElement.appendChild(centerBlock);
        
        // Aisle between center and right
        const aisle2 = document.createElement('div');
        aisle2.className = 'aisle';
        rowElement.appendChild(aisle2);
        
        // Right block
        const rightBlock = createSeatBlock('right', rowNumber, theaterConfig.rightBlockCols);
        rowElement.appendChild(rightBlock);
    } else {
        // Show only the selected sector (no aisles needed)
        if (sector === 'left') {
            const leftBlock = createSeatBlock('left', rowNumber, theaterConfig.leftBlockCols);
            rowElement.appendChild(leftBlock);
        } else if (sector === 'center') {
            const centerBlock = createSeatBlock('center', rowNumber, theaterConfig.centerBlockCols);
            rowElement.appendChild(centerBlock);
        } else if (sector === 'right') {
            const rightBlock = createSeatBlock('right', rowNumber, theaterConfig.rightBlockCols);
            rowElement.appendChild(rightBlock);
        }
    }
    
    return rowElement;
}

function createSeatBlock(blockName, row, cols) {
    const block = document.createElement('div');
    block.className = 'seat-block';
    
    for (let col = 1; col <= cols; col++) {
        const seat = document.createElement('div');
        const rowLabel = String.fromCharCode(64 + row);
        const seatId = `${rowLabel}-${blockName}-${col}`;
        
        seat.className = 'seat';
        seat.dataset.seatId = seatId;
        seat.dataset.row = rowLabel;
        seat.dataset.block = blockName;
        seat.dataset.col = col;
        
        // Set seat state
        if (theaterConfig.occupiedSeats.has(seatId)) {
            seat.classList.add('occupied');
        } else if (state.selectedSeats.has(seatId)) {
            seat.classList.add('selected');
        } else {
            seat.classList.add('available');
        }
        
        seat.addEventListener('click', handleSeatClick);
        block.appendChild(seat);
    }
    
    return block;
}

// Handle seat click
function handleSeatClick(event) {
    const seat = event.currentTarget;
    const seatId = seat.dataset.seatId;
    
    // Don't allow selection of occupied seats
    if (seat.classList.contains('occupied')) {
        return;
    }
    
    // Toggle selection
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        seat.classList.add('available');
        state.selectedSeats.delete(seatId);
    } else {
        seat.classList.remove('available');
        seat.classList.add('selected');
        state.selectedSeats.add(seatId);
    }
    
    updateSelectedSeatsDisplay();
}

// Update selected seats display
function updateSelectedSeatsDisplay() {
    const selectedSeatsList = document.getElementById('selectedSeatsList');
    const totalPrice = document.getElementById('totalPrice');
    
    if (state.selectedSeats.size === 0) {
        selectedSeatsList.innerHTML = '<p class="no-selection">No seats selected</p>';
        totalPrice.textContent = 'Total: $0.00';
    } else {
        const seatsArray = Array.from(state.selectedSeats).sort();
        selectedSeatsList.innerHTML = seatsArray.map(seatId => {
            return `<span class="seat-badge">${seatId}</span>`;
        }).join('');
        
        const total = state.selectedSeats.size * theaterConfig.seatPrice;
        totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Sector map handlers (for mobile)
function setupSectorMap() {
    const sectors = document.querySelectorAll('.sector');
    sectors.forEach(sector => {
        sector.addEventListener('click', () => {
            const sectorName = sector.dataset.sector;
            showSectorView(sectorName);
        });
    });
}

function showSectorView(sectorName) {
    state.currentSector = sectorName;
    generateSeatMap(sectorName);
    
    // Show seat map, hide sector map
    document.getElementById('seatMapContainer').style.display = 'block';
    document.getElementById('sectorMap').style.display = 'none';
    document.getElementById('backBtn').style.display = 'block';
    
    // Update sector highlighting
    document.querySelectorAll('.sector').forEach(s => {
        s.classList.toggle('active', s.dataset.sector === sectorName);
    });
}

function showAllSectors() {
    state.currentSector = null;
    generateSeatMap();
    
    // Show sector map, hide seat map on mobile
    if (state.isMobile) {
        document.getElementById('seatMapContainer').style.display = 'none';
        document.getElementById('sectorMap').style.display = 'grid';
    }
    document.getElementById('backBtn').style.display = 'none';
    
    // Remove active class from sectors
    document.querySelectorAll('.sector').forEach(s => {
        s.classList.remove('active');
    });
}

// Clear selection
function clearSelection() {
    state.selectedSeats.clear();
    
    // Update all seats
    document.querySelectorAll('.seat').forEach(seat => {
        if (!seat.classList.contains('occupied')) {
            seat.classList.remove('selected');
            seat.classList.add('available');
        }
    });
    
    updateSelectedSeatsDisplay();
}

// Book seats
function bookSeats() {
    if (state.selectedSeats.size === 0) {
        alert('Please select at least one seat.');
        return;
    }
    
    const seats = Array.from(state.selectedSeats).join(', ');
    alert(`Booking confirmed!\n\nSeats: ${seats}\nTotal: $${(state.selectedSeats.size * theaterConfig.seatPrice).toFixed(2)}\n\nThank you for choosing Sugarland Theaters!`);
    
    // Mark seats as occupied
    state.selectedSeats.forEach(seatId => {
        theaterConfig.occupiedSeats.add(seatId);
    });
    
    clearSelection();
    generateSeatMap(state.currentSector);
}

// Handle window resize
function handleResize() {
    const wasMobile = state.isMobile;
    state.isMobile = window.innerWidth <= 768;
    
    // If switching from mobile to desktop or vice versa
    if (wasMobile !== state.isMobile) {
        if (!state.isMobile) {
            // Switched to desktop - show full map
            showAllSectors();
        } else if (state.currentSector) {
            // Switched to mobile while viewing a sector - keep sector view
            showSectorView(state.currentSector);
        } else {
            // Switched to mobile - show sector map
            showAllSectors();
        }
    }
}

// Initialize
function init() {
    initializeOccupiedSeats();
    generateSeatMap();
    setupSectorMap();
    updateSelectedSeatsDisplay();
    
    // Event listeners
    document.getElementById('clearBtn').addEventListener('click', clearSelection);
    document.getElementById('bookBtn').addEventListener('click', bookSeats);
    document.getElementById('backBtn').addEventListener('click', showAllSectors);
    window.addEventListener('resize', handleResize);
    
    // Initial mobile check
    if (state.isMobile) {
        document.getElementById('seatMapContainer').style.display = 'none';
        document.getElementById('sectorMap').style.display = 'grid';
    }
}

// Start the application
init();

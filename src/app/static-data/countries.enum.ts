export const FirstLevelArr = [
    { id: '1', name: 'India' },
    { id: '2', name: 'Germany' }
];

export const SecondLevelArr = [
    { id: 's1', parentId: '2', name: 'Bavaria' },
    { id: 's2', parentId: '2', name: 'Berlin' },
    { id: 's3', parentId: '1', name: 'Maharashtra' },
    { id: 's4', parentId: '1', name: 'Tamilnadu' }
];

export const ThirdLevelArr = [
    { id: 'd1', parentId: 's1', name: 'Upper Bavaria' },
    { id: 'd2', parentId: 's1', name: 'Lower Bavaria' },
    { id: 'd3', parentId: 's2', name: 'Berlin-Mitte' },
    { id: 'd4', parentId: 's2', name: 'Kreuzberg' },
    { id: 'd5', parentId: 's3', name: 'Nashik' },
    { id: 'd6', parentId: 's3', name: 'Jalgoan' },
    { id: 'd7', parentId: 's4', name: 'Ariyalur' },
    { id: 'd8', parentId: 's4', name: 'Chennai' }
];

export const FourthLevelArr = [
    { id: 'p1', parentId: 'd1', name: 'Munich' },
    { id: 'p2', parentId: 'd1', name: 'Erding' },
    { id: 'p3', parentId: 'd2', name: 'Leipzig' },
    { id: 'p4', parentId: 'd2', name: 'Landshut' },
    { id: 'p5', parentId: 'd3', name: 'Passau' },
    { id: 'p6', parentId: 'd3', name: 'Gesundbrunnen' },
    { id: 'p7', parentId: 'd4', name: 'Frieburg' },
    { id: 'p8', parentId: 'd4', name: 'Hamburg' },
    { id: 'p9', parentId: 'd6', name: 'Raver' },
    { id: 'p10', parentId: 'd6', name: 'Savda' },
    { id: 'p11', parentId: 'd5', name: 'Ozar' },
    { id: 'p12', parentId: 'd5', name: 'Manmad' },
    { id: 'p13', parentId: 'd7', name: 'Thirumanur' },
    { id: 'p14', parentId: 'd7', name: 'Sendurai' },
    { id: 'p15', parentId: 'd8', name: 'New Chennai' },
    { id: 'p16', parentId: 'd8', name: 'Old Chennai' }
];
